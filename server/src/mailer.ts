import nodemailer from 'nodemailer'
import { config } from './config.js'

export type ContactSubmission = {
  name: string
  email: string
  phone?: string
  interest: string
  message: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function sendContactEmail(submission: ContactSubmission) {
  const smtpConfigured = Boolean(config.SMTP_HOST && config.SMTP_USER && config.SMTP_PASS)

  if (!smtpConfigured) {
    if (config.NODE_ENV === 'production') {
      throw new Error('Email service is not configured.')
    }

    console.info('Contact submission received in development:', {
      ...submission,
      message: `${submission.message.slice(0, 120)}${submission.message.length > 120 ? '…' : ''}`,
    })
    return
  }

  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_SECURE,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  })

  const safe = {
    name: escapeHtml(submission.name),
    email: escapeHtml(submission.email),
    phone: escapeHtml(submission.phone || 'Not provided'),
    interest: escapeHtml(submission.interest),
    message: escapeHtml(submission.message).replaceAll('\n', '<br />'),
  }

  await transporter.sendMail({
    from: `Diamond Suites Website <${config.CONTACT_FROM}>`,
    to: config.CONTACT_TO,
    replyTo: submission.email,
    subject: `Website inquiry: ${submission.interest} from ${submission.name}`,
    text: [
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      `Phone: ${submission.phone || 'Not provided'}`,
      `Interest: ${submission.interest}`,
      '',
      submission.message,
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717">
        <h2>New Diamond Suites Crystal River Inquiry</h2>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Interest:</strong> ${safe.interest}</p>
        <hr />
        <p>${safe.message}</p>
      </div>
    `,
  })
}
