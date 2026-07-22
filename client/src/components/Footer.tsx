import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navItems, site } from '../data/site'
import { LogoImage } from './LogoImage'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main container">
        <div className="footer-intro">
          <Link to="/" aria-label="Diamond Suites Crystal River home"><LogoImage className="footer-logo" /></Link>
          <p>Private salon suites and independent beauty and wellness professionals in Crystal River, Florida.</p>
          <Link className="footer-inquiry" to="/contact">Ask about a suite <ArrowUpRight aria-hidden="true" /></Link>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <h2>Visit</h2>
          {navItems.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
          <Link to="/salon-etiquette">Salon Etiquette</Link>
        </nav>

        <div className="footer-contact">
          <h2>Crystal River</h2>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin aria-hidden="true" />
            <span>{site.addressLine1}<br />{site.addressLine2}</span>
          </a>
          <a href={site.phoneHref}><Phone aria-hidden="true" /> {site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}><Mail aria-hidden="true" /> <span>{site.email}</span></a>

          <div className="footer-socials" aria-label="Social media">
            <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Facebook"><Facebook /></a>
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram"><Instagram /></a>
          </div>
        </div>

        <div className="footer-related">
          <h2>Diamond family</h2>
          <a href="https://diamondsuitesdowntownocala.com/" target="_blank" rel="noopener noreferrer">Downtown Ocala <ArrowUpRight aria-hidden="true" /></a>
          <a href="https://diamondsuitesocala.com/" target="_blank" rel="noopener noreferrer">Ocala <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} Diamond Suites Crystal River</span>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
