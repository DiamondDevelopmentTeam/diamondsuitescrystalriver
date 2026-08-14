import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4100),
  ALLOWED_ORIGINS: z.string().default('https://diamondsuitescrystalriver.com,https://www.diamondsuitescrystalriver.com'),
  SERVE_CLIENT: z.string().default('false').transform((value) => value === 'true'),
  GRAPH_TENANT_ID: z.string().trim().optional(),
  GRAPH_CLIENT_ID: z.string().trim().optional(),
  GRAPH_CLIENT_SECRET: z.string().trim().optional(),
  GRAPH_SENDER_EMAIL: z.email().optional(),
  INQUIRY_RECIPIENT_EMAIL: z.email().default('ashley@diamondsuitesocala.com'),
  RECAPTCHA_SECRET_KEY: z.string().trim().optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment configuration:', z.prettifyError(parsed.error))
  process.exit(1)
}

export const config = {
  ...parsed.data,
  allowedOrigins: parsed.data.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean),
}
