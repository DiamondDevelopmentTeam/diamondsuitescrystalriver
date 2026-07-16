import { useEffect } from 'react'

const revealSelector = [
  'main section',
  'main h1',
  'main h2',
  'main h3',
  'main p',
  'main .button',
  'main .text-link',
  'main .feature-image',
  'main .service-card',
  'main .benefits-list article',
  'main .masonry-gallery img',
  'main .amenities-grid article',
  'main .values-grid article',
  'main .professional-card',
  'main .accordion-item',
  'main .contact-details > a',
  'main .contact-socials a',
  'main .contact-form',
  'main .location-grid a',
  'main .policy-list article',
  'main .legal-container',
].join(',')

const staggerParents = [
  '.services-track',
  '.benefits-list',
  '.masonry-gallery',
  '.amenities-grid',
  '.values-grid',
  '.directory-grid',
  '.accordion',
  '.contact-socials',
  '.location-grid',
  '.policy-list',
]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function variantFor(element: Element) {
  if (element.matches('img, .feature-image, .service-card, .professional-card')) {
    return 'motion-reveal--scale'
  }

  if (element.matches('.button, .text-link, .contact-socials a')) {
    return 'motion-reveal--button'
  }

  if (element.matches('section')) {
    return 'motion-reveal--section'
  }

  return 'motion-reveal--up'
}

function staggerDelayFor(element: Element) {
  const parent = staggerParents.find((selector) => element.parentElement?.matches(selector))

  if (!parent || !element.parentElement) {
    return ''
  }

  const index = Array.from(element.parentElement.children).indexOf(element)
  return `${Math.min(index, 6) * 70}ms`
}

export function useScrollReveal(pathname: string) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector))

    elements.forEach((element) => {
      element.classList.add('motion-reveal', variantFor(element))

      const delay = staggerDelayFor(element)
      if (delay) {
        element.style.setProperty('--reveal-delay', delay)
      }
    })

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [pathname])
}
