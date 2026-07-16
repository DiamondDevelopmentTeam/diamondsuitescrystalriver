import { FormEvent, useState } from 'react'

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

    const apiBase = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? ''

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const result = (await response.json()) as { message?: string }
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
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Name
          <input required minLength={2} maxLength={80} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </label>
        <label>
          Email
          <input required type="email" maxLength={160} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
        <label>
          Phone
          <input type="tel" maxLength={30} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
        </label>
        <label>
          I am interested in
          <select value={form.interest} onChange={(event) => setForm({ ...form, interest: event.target.value })}>
            <option>General inquiry</option>
            <option>Booking a service</option>
            <option>Suite availability</option>
            <option>Schedule a tour</option>
          </select>
        </label>
      </div>
      <label>
        Message
        <textarea required minLength={10} maxLength={3000} rows={7} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} />
      </label>
      <button className="button button--gold" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      {feedback ? <p className={`form-feedback form-feedback--${status}`} role="status">{feedback}</p> : null}
    </form>
  )
}
