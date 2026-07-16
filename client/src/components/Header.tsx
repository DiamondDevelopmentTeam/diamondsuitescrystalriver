import { useEffect, useState } from 'react'
import { Facebook, Instagram, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems, site } from '../data/site'
import { LogoImage } from './LogoImage'
import './HeaderFooter.css'

export function Header() {
  const [isCompact, setIsCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

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
      <header className={`site-header crystal-header ${isCompact ? 'site-header--compact' : ''}`}>
        <div className="top-header crystal-header__top">
          <div className="top-header__inner container">
            <Link className="brand-link crystal-header__brand" to="/" aria-label="Diamond Suites Crystal River home">
              <LogoImage className="brand-logo" />
            </Link>

            <div className="contact-strip" aria-label="Contact information">
              <a href={site.phoneHref} className="contact-chip">
                <span className="contact-chip__icon" aria-hidden="true"><Phone /></span>
                <span><strong>Call Us</strong>{site.phoneDisplay}</span>
              </a>

              <a href={`mailto:${site.email}`} className="contact-chip contact-chip--email">
                <span className="contact-chip__icon" aria-hidden="true"><Mail /></span>
                <span><strong>Email</strong>{site.email}</span>
              </a>

              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="contact-chip">
                <span className="contact-chip__icon" aria-hidden="true"><MapPin /></span>
                <span><strong>Location</strong>{site.addressLine1}<br />{site.addressLine2}</span>
              </a>
            </div>

            <div className="social-block">
              <div className="social-links">
                <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Facebook"><Facebook /></a>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram"><Instagram /></a>
              </div>
              <Link className="salon-etiquette-link" to="/salon-etiquette">Salon Etiquette</Link>
            </div>

            <button
              className="mobile-menu-button"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu />
            </button>
          </div>
        </div>

        <nav className="main-nav crystal-header__nav" aria-label="Main navigation">
          <div className="main-nav__inner container">
            <div className="main-nav__links">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              ))}
            </div>
            <a className="nav-call" href={site.phoneHref}><Phone aria-hidden="true" /> Call Us</a>
          </div>
        </nav>
      </header>

      <div
        id="mobile-navigation"
        className={`mobile-menu crystal-mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button>

        <Link className="crystal-mobile-menu__logo-card" to="/" onClick={() => setMenuOpen(false)}>
          <LogoImage className="mobile-menu__logo" />
        </Link>

        <div className="mobile-menu__links">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/salon-etiquette" onClick={() => setMenuOpen(false)}>Salon Etiquette</NavLink>
        </div>

        <a className="button button--gold" href={site.phoneHref}><Phone aria-hidden="true" /> Call {site.phoneDisplay}</a>
      </div>
    </>
  )
}
