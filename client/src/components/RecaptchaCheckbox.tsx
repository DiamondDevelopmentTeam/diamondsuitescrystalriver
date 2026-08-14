import { useEffect, useRef, useState } from 'react'

type RecaptchaApi = {
  render: (container: HTMLElement, options: {
    sitekey: string
    theme: 'light'
    callback: (token: string) => void
    'expired-callback': () => void
    'error-callback': () => void
  }) => number
  reset: (widgetId?: number) => void
}

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi
  }
}

let recaptchaScriptPromise: Promise<void> | null = null

function loadRecaptchaScript() {
  if (window.grecaptcha) return Promise.resolve()
  if (recaptchaScriptPromise) return recaptchaScriptPromise

  recaptchaScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-recaptcha-v2]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('reCAPTCHA could not be loaded.')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.dataset.recaptchaV2 = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('reCAPTCHA could not be loaded.'))
    document.head.appendChild(script)
  })

  return recaptchaScriptPromise
}

type RecaptchaCheckboxProps = {
  siteKey: string
  resetSignal: number
  onChange: (token: string) => void
  onExpired: () => void
  onError: (message: string) => void
}

export function RecaptchaCheckbox({ siteKey, resetSignal, onChange, onExpired, onError }: RecaptchaCheckboxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | undefined>(undefined)
  const [loading, setLoading] = useState(Boolean(siteKey))

  useEffect(() => {
    if (!siteKey || !containerRef.current) return
    let active = true

    loadRecaptchaScript()
      .then(() => {
        if (!active || !containerRef.current || !window.grecaptcha || widgetIdRef.current !== undefined) return
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'light',
          callback: onChange,
          'expired-callback': onExpired,
          'error-callback': () => onError('The CAPTCHA could not load. Check your connection and try again.'),
        })
        setLoading(false)
      })
      .catch(() => {
        if (!active) return
        setLoading(false)
        onError('The CAPTCHA could not load. Check your connection and try again.')
      })

    return () => {
      active = false
    }
  }, [onChange, onError, onExpired, siteKey])

  useEffect(() => {
    if (resetSignal > 0 && widgetIdRef.current !== undefined) {
      window.grecaptcha?.reset(widgetIdRef.current)
    }
  }, [resetSignal])

  if (!siteKey) {
    return <p className="captcha-config" role="status">Form verification is not configured yet. Add the public reCAPTCHA site key to enable submissions.</p>
  }

  return (
    <div className="captcha-field" aria-live="polite">
      <div ref={containerRef} />
      {loading ? <span>Loading verification…</span> : null}
    </div>
  )
}
