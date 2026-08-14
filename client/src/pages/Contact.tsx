import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { site } from '../data/site'

const locations = [
  { name: 'Diamond Suites Downtown Ocala', address: '917 E Silver Springs Blvd, Ocala, FL 34470', phone: '352-244-8367', href: 'https://diamondsuitesdowntownocala.com/' },
  { name: 'Diamond Suites Ocala', address: '7494 SW 60th Ave, Suite A, Ocala, FL 34476', phone: '352-244-8352', href: 'https://diamondsuitesocala.com/' },
  { name: 'Diamond Suites Crystal River', address: '825 N Citrus Ave, Crystal River, FL 34428', phone: '352-244-8352', href: '/' },
]

export function Contact() {
  return (
    <>
      <PageHero eyebrow="Start a Conversation" title="Contact Diamond Suites" image="about-banner" description="Questions about a service, a professional, or suite availability? Reach out to our team." />
      <section className="marble-surface section-space">
        <div className="container contact-layout">
          <aside className="contact-details" data-reveal>
            <p className="eyebrow">Contact Details</p>
            <h2 className="script-heading">We would love to hear from you</h2>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin /><span>{site.addressLine1}<br />{site.addressLine2}</span></a>
            <a href={site.phoneHref}><Phone />{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}><Mail />{site.email}</a>
            <div className="contact-socials">
              <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook /></a>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
            </div>
            <div className="map-frame">
              <iframe title="Diamond Suites Crystal River map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=825%20N%20Citrus%20Ave%20Crystal%20River%20FL%2034428&output=embed" />
            </div>
          </aside>
          <div data-reveal>
            <p className="eyebrow">Send a Message</p>
            <h2>Tell us how we can help</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="locations-section section-space">
        <div className="container">
          <p className="eyebrow centered">Our Florida Locations</p>
          <h2 className="script-heading centered">Three destinations, one Diamond standard</h2>
          <div className="location-grid" data-reveal>
            {locations.map((location) => location.href === '/' ? (
              <Link key={location.name} to="/">
                <MapPin />
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <strong>{location.phone}</strong>
              </Link>
            ) : (
              <a key={location.name} href={location.href} target="_blank" rel="noopener noreferrer">
                <MapPin />
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <strong>{location.phone}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
