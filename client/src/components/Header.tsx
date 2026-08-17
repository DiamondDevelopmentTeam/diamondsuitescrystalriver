import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems, site } from '../data/site'
import { LogoImage } from './LogoImage'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)

        window.requestAnimationFrame(() => {
          menuButtonRef.current?.focus()
        })
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
      <header className="site-header">
        <div className="site-header__inner container">
          <Link
            className="brand-link"
            to="/"
            aria-label="Diamond Suites Crystal River home"
          >
            <LogoImage className="brand-logo" />
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link className="header-inquiry" to="/contact">
            <span>Inquire</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>

          <button
            ref={menuButtonRef}
            className="mobile-menu-button"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div
          className="mobile-menu-backdrop"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setMenuOpen(false)
              menuButtonRef.current?.focus()
            }
          }}
        >
          <div
            id="mobile-navigation"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
          >
            <div className="mobile-menu__top">
              <LogoImage className="mobile-menu__logo" />

              <button
                autoFocus
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  menuButtonRef.current?.focus()
                }}
                aria-label="Close navigation"
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <nav
              className="mobile-menu__links"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight aria-hidden="true" />
                </NavLink>
              ))}

              <NavLink
                to="/salon-etiquette"
                onClick={() => setMenuOpen(false)}
              >
                <span>Salon Etiquette</span>
                <ArrowUpRight aria-hidden="true" />
              </NavLink>
            </nav>

            <div className="mobile-menu__contact">
              <a href={site.phoneHref}>
                {site.phoneDisplay}
              </a>

              <a href={`mailto:${site.email}`}>
                {site.email}
              </a>

              <p>
                {site.addressLine1}
                <br />
                {site.addressLine2}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}