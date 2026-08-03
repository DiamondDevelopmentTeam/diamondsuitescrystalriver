import { useEffect } from 'react'

export function useScrollReveal(pathname: string) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      return
    }

    const belowViewport = elements.filter((element) => element.getBoundingClientRect().top > window.innerHeight * 0.92)
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
    return () => {
      observer.disconnect()
      belowViewport.forEach((element) => element.classList.remove('reveal-pending'))
    }
  }, [pathname])
}
