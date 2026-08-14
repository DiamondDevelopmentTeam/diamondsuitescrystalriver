import { config } from './config.js'

export type ContactSubmission = {
  name: string
  email: string
  phone?: string
  interest: string
  message: string
  sourcePage: string
  submittedAt: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function assertGraphConfiguration() {
  const values = [config.GRAPH_TENANT_ID, config.GRAPH_CLIENT_ID, config.GRAPH_CLIENT_SECRET, config.GRAPH_SENDER_EMAIL]
  if (values.some((value) => !value)) throw new Error('Microsoft Graph email service is not configured.')
}

async function getGraphAccessToken() {
  assertGraphConfiguration()
  const body = new URLSearchParams({
    client_id: config.GRAPH_CLIENT_ID!,
    client_secret: config.GRAPH_CLIENT_SECRET!,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  })

  const response = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(config.GRAPH_TENANT_ID!)}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    signal: AbortSignal.timeout(10_000),
  })

  const result = await response.json().catch(() => ({})) as { access_token?: string }
  if (!response.ok || !result.access_token) throw new Error('Microsoft Graph authentication failed.')
  return result.access_token
}

function fieldRow(label: string, value: string) {
  return `<tr><th style="width:170px;padding:12px 18px 12px 0;border-bottom:1px solid #dedbd4;text-align:left;vertical-align:top;color:#62625f;font-size:12px;letter-spacing:.08em;text-transform:uppercase">${label}</th><td style="padding:12px 0;border-bottom:1px solid #dedbd4;color:#111111">${value}</td></tr>`
}

export async function sendContactEmail(submission: ContactSubmission) {
  const accessToken = await getGraphAccessToken()
  const safe = {
    name: escapeHtml(submission.name),
    email: escapeHtml(submission.email),
    phone: escapeHtml(submission.phone || 'Not provided'),
    interest: escapeHtml(submission.interest),
    message: escapeHtml(submission.message).replaceAll('\n', '<br />'),
    sourcePage: escapeHtml(submission.sourcePage),
    submittedAt: escapeHtml(submission.submittedAt),
  }

  const html = `
    <div style="margin:0;padding:32px;background:#f4f1ea;font-family:Arial,sans-serif;line-height:1.6;color:#111111">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;padding:42px;border-top:5px solid #111111">
        <p style="margin:0 0 9px;color:#0f766e;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">Diamond Suites Crystal River</p>
        <h1 style="margin:0 0 30px;font-size:30px;line-height:1.15">New Website Inquiry</h1>
        <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px">
          ${fieldRow('Name', safe.name)}
          ${fieldRow('Email', safe.email)}
          ${fieldRow('Phone', safe.phone)}
          ${fieldRow('Inquiry Type', safe.interest)}
          ${fieldRow('Submitted At', safe.submittedAt)}
          ${fieldRow('Source Page', safe.sourcePage)}
        </table>
        <h2 style="margin:30px 0 10px;font-size:16px">Message</h2>
        <p style="margin:0;color:#292929">${safe.message}</p>
        <p style="margin:36px 0 0;padding-top:18px;border-top:1px solid #dedbd4;color:#70706c;font-size:11px">
          This message was submitted through the Diamond Suites Crystal River website inquiry form.<br />
          Do not forward sensitive information without verifying the intended recipient.
        </p>
      </div>
    </div>`

  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.GRAPH_SENDER_EMAIL!)}/sendMail`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: {
        subject: `Diamond Suites Crystal River — ${submission.interest}`,
        body: { contentType: 'HTML', content: html },
        toRecipients: [{ emailAddress: { address: config.INQUIRY_RECIPIENT_EMAIL } }],
        replyTo: [{ emailAddress: { address: submission.email, name: submission.name } }],
      },
      saveToSentItems: true,
    }),
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    const detail = await response.text()
    console.error('Microsoft Graph sendMail failed:', response.status, detail.slice(0, 500))
    throw new Error('Microsoft Graph could not send the inquiry email.')
  }
}
