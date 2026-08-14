import { useEffect } from 'react'

export function useScrollReveal(pathname: string) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], .reveal-up, .heading-rule'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-revealed'))
      return
    }

    elements.forEach((element) => {
      const hasImage = element.matches('figure, picture') || Boolean(element.querySelector('picture, img'))
      const isGroup = /grid|list|ribbon/.test(element.className)
      element.dataset.revealType ||= isGroup ? 'stagger' : hasImage ? 'image' : 'copy'
    })

    const belowViewport = elements.filter((element) => element.getBoundingClientRect().top > window.innerHeight * 0.9)
    belowViewport.forEach((element) => element.classList.add('reveal-pending'))

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending')
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 })

    belowViewport.forEach((element) => observer.observe(element))
    const failSafe = window.setTimeout(() => {
      belowViewport.forEach((element) => {
        element.classList.remove('reveal-pending')
        element.classList.add('is-revealed')
      })
      observer.disconnect()
    }, 12_000)

    return () => {
      window.clearTimeout(failSafe)
      observer.disconnect()
      belowViewport.forEach((element) => element.classList.remove('reveal-pending'))
    }
  }, [pathname])
}
