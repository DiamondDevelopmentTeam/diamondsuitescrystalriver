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
  phone: z.string().trim().max(30).optional().default(''),
  interest: z.enum(['General inquiry', 'Booking a service', 'Suite availability', 'Schedule a tour']),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0).optional().default(''),
})

export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', 1)

  app.use(helmet({
    contentSecurityPolicy: config.SERVE_CLIENT ? {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https://www.google.com', 'https://maps.gstatic.com', 'https://*.googleapis.com'],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        frameSrc: ['https://www.google.com'],
        connectSrc: ["'self'"],
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

      await sendContactEmail(parsed.data)
      response.status(202).json({ message: 'Thank you. Your message has been sent to the Diamond Suites team.' })
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
