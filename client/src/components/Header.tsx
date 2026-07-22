import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems, site } from '../data/site'
import { LogoImage } from './LogoImage'

export function Header() {
  const [isCompact, setIsCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let frame = 0

    const updateHeaderState = () => {
      setIsCompact((current) => {
        if (!current && window.scrollY > 72) {
          return true
        }

        if (current && window.scrollY < 28) {
          return false
        }

        return current
      })
    }

    const handleScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateHeaderState)
    }

    updateHeaderState()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        window.requestAnimationFrame(() => menuButtonRef.current?.focus())
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <>
      <header className={`site-header ${isCompact ? 'site-header--compact' : ''}`}>
        <div className="site-header__inner container">
          <Link className="brand-link" to="/" aria-label="Diamond Suites Crystal River home">
            <LogoImage className="brand-logo" />
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}</NavLink>
            ))}
          </nav>

          <Link className="header-inquiry" to="/contact">
            Suite inquiry <ArrowUpRight aria-hidden="true" />
          </Link>

          <button
            ref={menuButtonRef}
            className="mobile-menu-button"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          ><Menu /></button>
        </div>
      </header>

      {menuOpen ? (
        <div className="mobile-menu-backdrop" onMouseDown={(event) => {
          if (event.currentTarget === event.target) {
            setMenuOpen(false)
            menuButtonRef.current?.focus()
          }
        }}>
          <div id="mobile-navigation" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Main navigation">
            <div className="mobile-menu__top">
              <LogoImage className="mobile-menu__logo" />
              <button autoFocus type="button" onClick={() => {
                setMenuOpen(false)
                menuButtonRef.current?.focus()
              }} aria-label="Close navigation"><X /></button>
            </div>

            <nav className="mobile-menu__links" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setMenuOpen(false)}>
                  <span>{item.label}</span><ArrowUpRight aria-hidden="true" />
                </NavLink>
              ))}
              <NavLink to="/salon-etiquette" onClick={() => setMenuOpen(false)}>
                <span>Salon Etiquette</span><ArrowUpRight aria-hidden="true" />
              </NavLink>
            </nav>

            <div className="mobile-menu__contact">
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <p>{site.addressLine1}<br />{site.addressLine2}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
