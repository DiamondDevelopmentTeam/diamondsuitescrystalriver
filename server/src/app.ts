import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { z } from 'zod'
import { config } from './config.js'
import { sendContactEmail } from './mailer.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const clientDist = path.resolve(dirname, '../../client/dist')

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  phone: z.string().trim().max(30).refine((value) => !value || /^\+?[\d\s().-]{7,30}$/.test(value), 'Enter a valid telephone number.').optional().default(''),
  interest: z.enum(['General inquiry', 'Booking a service', 'Suite availability', 'Schedule a tour']),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(200).optional().default(''),
  captchaToken: z.string().min(20).max(4096),
  sourcePage: z.string().trim().max(300).default('/contact'),
  formType: z.enum(['contact', 'inquiry']).optional(),
})

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  if (digits.length === 11 && digits.startsWith('1')) return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  return phone.trim()
}

async function verifyRecaptcha(token: string, remoteIp?: string) {
  if (!config.RECAPTCHA_SECRET_KEY) throw new Error('reCAPTCHA verification is not configured.')
  const body = new URLSearchParams({ secret: config.RECAPTCHA_SECRET_KEY, response: token })
  if (remoteIp) body.set('remoteip', remoteIp)

  const verification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    signal: AbortSignal.timeout(8_000),
  })
  const result = await verification.json().catch(() => ({})) as { success?: boolean; 'error-codes'?: string[] }
  return Boolean(verification.ok && result.success)
}

export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', 1)

  app.use(helmet({
    contentSecurityPolicy: config.SERVE_CLIENT ? {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https://www.google.com', 'https://maps.gstatic.com', 'https://*.googleapis.com'],
        scriptSrc: ["'self'", 'https://www.google.com', 'https://www.gstatic.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        frameSrc: ['https://www.google.com'],
        connectSrc: ["'self'", 'https://www.google.com'],
      },
    } : false,
    crossOriginEmbedderPolicy: false,
  }))

  const developmentOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']
  const allowedOrigins = new Set(config.NODE_ENV === 'production' ? config.allowedOrigins : [...config.allowedOrigins, ...developmentOrigins])

  app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true)
      return callback(new Error('Origin is not allowed by CORS.'))
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }))

  app.use(express.json({ limit: '32kb' }))

  app.use('/api', (_request, response, next) => {
    response.setHeader('Cache-Control', 'no-store')
    next()
  })

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok', service: 'diamondsuitescrystalriver-server' })
  })

  app.post('/api/contact', rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { message: 'Too many messages were submitted. Please wait a few minutes and try again.' },
  }), async (request, response, next) => {
    try {
      const parsed = contactSchema.safeParse(request.body)
      if (!parsed.success) {
        response.status(400).json({
          message: 'Please review the form and complete all required fields.',
          issues: parsed.error.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
        })
        return
      }

      if (parsed.data.website) {
        response.status(202).json({ message: 'Thanks. Your inquiry has been sent.' })
        return
      }

      const captchaValid = await verifyRecaptcha(parsed.data.captchaToken, request.ip)
      if (!captchaValid) {
        response.status(400).json({ message: 'CAPTCHA verification failed or expired. Please complete it again.' })
        return
      }

      await sendContactEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: normalizePhone(parsed.data.phone),
        interest: parsed.data.interest,
        message: parsed.data.message,
        sourcePage: parsed.data.sourcePage,
        submittedAt: new Date().toISOString(),
      })
      response.status(202).json({ message: 'Thanks. Your inquiry has been sent. We’ll be in touch soon.' })
    } catch (error) {
      next(error)
    }
  })

  if (config.SERVE_CLIENT) {
    app.use(express.static(clientDist, {
      maxAge: config.NODE_ENV === 'production' ? '7d' : 0,
      index: false,
    }))

    app.get('/{*splat}', (request, response, next) => {
      if (request.path.startsWith('/api') || request.path === '/health') return next()
      response.sendFile(path.join(clientDist, 'index.html'))
    })
  }

  app.use((_request, response) => {
    response.status(404).json({ message: 'Not found.' })
  })

  app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error(error)
    response.status(500).json({ message: 'The message could not be sent right now. Please call or email us directly.' })
  })

  return app
}
