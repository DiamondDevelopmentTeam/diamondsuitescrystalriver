import { useState } from 'react'
import type { FormEvent } from 'react'
import { getFormsApiUrl } from '../config/api'

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setFeedback('')

    const endpoint = form.interest === 'Suite availability' || form.interest === 'Schedule a tour'
      ? 'inquiry'
      : 'contact'

    try {
      const response = await fetch(getFormsApiUrl(endpoint), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, formType: endpoint }),
      })

      const result = await response.json().catch(() => ({})) as { message?: string }
      if (!response.ok) throw new Error(result.message || 'Unable to send your message.')

      setStatus('success')
      setFeedback(result.message || 'Thank you. Your message has been sent.')
      setForm(initialState)
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Unable to send your message. Please email or call us directly.')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={status === 'sending'}>
      <div className="form-grid">
        <label>
          <span>Name <span className="required-mark" aria-hidden="true">*</span></span>
          <input name="name" autoComplete="name" required minLength={2} maxLength={80} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </label>
        <label>
          <span>Email <span className="required-mark" aria-hidden="true">*</span></span>
          <input name="email" autoComplete="email" required type="email" maxLength={160} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
        <label>
          <span>Phone <span className="optional-mark">(optional)</span></span>
          <input name="phone" autoComplete="tel" type="tel" maxLength={30} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
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
        <textarea name="message" required minLength={10} maxLength={3000} rows={7} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} />
      </label>
      <button className="button button--gold" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      {feedback ? <p className={`form-feedback form-feedback--${status}`} role={status === 'error' ? 'alert' : 'status'} aria-live="polite">{feedback}</p> : null}
    </form>
  )
}
