import type { CSSProperties } from 'react'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navItems, site } from '../data/site'
import { assetUrl } from '../utils/assetUrl'
import { BrandAsset } from './BrandAsset'
import { LogoImage } from './LogoImage'
import './HeaderFooter.css'

export function Footer() {
  const marbleStyle = {
    '--crystal-marble-background': `url("${assetUrl('images/blackMarble.jpg')}")`,
  } as CSSProperties

  return (
    <footer className="site-footer crystal-footer" style={marbleStyle}>
      <div className="footer-inner container">
        <div className="footer-brands" aria-label="Diamond Suites locations">
          <Link className="footer-logo-card footer-logo-card--primary" to="/" aria-label="Diamond Suites Crystal River home">
            <LogoImage className="footer-primary-logo" />
          </Link>

          <a
            className="footer-logo-card"
            href="https://diamondsuitesdowntownocala.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Diamond Suites Downtown Ocala"
          >
            <BrandAsset
              src="images/DiamondSuitesDownTownOcalaLogo.gif"
              alt="Diamond Suites Downtown Ocala"
              className="partner-logo-image"
              fallbackClassName="partner-logo--pink"
              fallbackTitle="DIAMOND SUITES"
              fallbackSubtitle="DOWNTOWN OCALA"
            />
          </a>

          <a
            className="footer-logo-card"
            href="https://diamondsuitesocala.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Diamond Suites Ocala"
          >
            <BrandAsset
              src="images/DiamondSuitesOcalaLogo.gif"
              alt="Diamond Suites Ocala"
              className="partner-logo-image"
              fallbackClassName="partner-logo--blue"
              fallbackTitle="DIAMOND"
              fallbackSubtitle="SUITES OCALA"
            />
          </a>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <h2>Explore</h2>
          {navItems.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
          <Link to="/salon-etiquette">Salon Etiquette</Link>
        </nav>

        <div className="footer-contact">
          <h2>Contact</h2>
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
      </div>

      <div className="crystal-footer__bottom-shell">
        <div className="footer-bottom container">
          <span>Copyright © {new Date().getFullYear()} Diamond Suites Crystal River. All Rights Reserved.</span>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
