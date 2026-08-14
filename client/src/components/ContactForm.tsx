import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'
import { formsApiConfig, getFormsApiUrl } from '../config/api'
import { RecaptchaCheckbox } from './RecaptchaCheckbox'

type FormState = {
  name: string
  email: string
  phone: string
  interest: string
  message: string
  website: string
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  interest: 'General inquiry',
  message: '',
  website: '',
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaResetSignal, setCaptchaResetSignal] = useState(0)

  const handleCaptchaChange = useCallback((token: string) => {
    setCaptchaToken(token)
    setFeedback('')
  }, [])

  const handleCaptchaExpired = useCallback(() => {
    setCaptchaToken('')
    setStatus('error')
    setFeedback('Your CAPTCHA verification expired. Please complete it again.')
  }, [])

  const handleCaptchaError = useCallback((message: string) => {
    setCaptchaToken('')
    setStatus('error')
    setFeedback(message)
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!captchaToken) {
      setStatus('error')
      setFeedback('Please complete the “I’m not a robot” verification.')
      return
    }
    setStatus('sending')
    setFeedback('')
    setFieldErrors({})

    const endpoint = form.interest === 'Suite availability' || form.interest === 'Schedule a tour'
      ? 'inquiry'
      : 'contact'

    try {
      const response = await fetch(getFormsApiUrl(endpoint), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          captchaToken,
          formType: endpoint,
          sourcePage: window.location.pathname,
        }),
      })

      const result = await response.json().catch(() => ({})) as { message?: string; issues?: { path: string; message: string }[] }
      if (!response.ok) {
        if (result.issues?.length) {
          setFieldErrors(Object.fromEntries(result.issues.map((issue) => [issue.path, issue.message])))
        }
        throw new Error(result.message || 'Unable to send your message.')
      }

      setStatus('success')
      setFeedback(result.message || 'Thank you. Your message has been sent.')
      setForm(initialState)
      setCaptchaToken('')
      setCaptchaResetSignal((value) => value + 1)
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Unable to send your message. Please email or call us directly.')
      setCaptchaToken('')
      setCaptchaResetSignal((value) => value + 1)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={status === 'sending'}>
      <div className="form-grid">
        <label>
          <span>Name <span className="required-mark" aria-hidden="true">*</span></span>
          <input name="name" autoComplete="name" required minLength={2} maxLength={80} value={form.name} aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? 'name-error' : undefined} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          {fieldErrors.name ? <small id="name-error" className="field-error">{fieldErrors.name}</small> : null}
        </label>
        <label>
          <span>Email <span className="required-mark" aria-hidden="true">*</span></span>
          <input name="email" autoComplete="email" required type="email" maxLength={160} value={form.email} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? 'email-error' : undefined} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          {fieldErrors.email ? <small id="email-error" className="field-error">{fieldErrors.email}</small> : null}
        </label>
        <label>
          <span>Phone <span className="optional-mark">(optional)</span></span>
          <input name="phone" autoComplete="tel" type="tel" maxLength={30} value={form.phone} aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? 'phone-error' : undefined} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          {fieldErrors.phone ? <small id="phone-error" className="field-error">{fieldErrors.phone}</small> : null}
        </label>
        <label>
          I am interested in
          <select name="interest" value={form.interest} onChange={(event) => setForm({ ...form, interest: event.target.value })}>
            <option>General inquiry</option>
            <option>Booking a service</option>
            <option>Suite availability</option>
            <option>Schedule a tour</option>
          </select>
        </label>
      </div>
      <label>
        <span>Message <span className="required-mark" aria-hidden="true">*</span></span>
        <textarea name="message" required minLength={10} maxLength={3000} rows={7} value={form.message} aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? 'message-error' : undefined} onChange={(event) => setForm({ ...form, message: event.target.value })} />
        {fieldErrors.message ? <small id="message-error" className="field-error">{fieldErrors.message}</small> : null}
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} />
      </label>
      <RecaptchaCheckbox
        siteKey={formsApiConfig.recaptchaSiteKey}
        resetSignal={captchaResetSignal}
        onChange={handleCaptchaChange}
        onExpired={handleCaptchaExpired}
        onError={handleCaptchaError}
      />
      <button className="button button--gold" type="submit" disabled={status === 'sending' || !formsApiConfig.recaptchaSiteKey}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      {feedback ? <p className={`form-feedback form-feedback--${status}`} role={status === 'error' ? 'alert' : 'status'} aria-live="polite">{feedback}</p> : null}
    </form>
  )
}
