import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { site } from '../data/site'

type Location = {
  name: string
  address: string
  phone: string
  href: string
  internal?: boolean
}

const locations: Location[] = [
  {
    name: 'Diamond Suites Downtown Ocala',
    address: '917 E Silver Springs Blvd, Ocala, FL 34470',
    phone: '352-244-8367',
    href: 'https://diamondsuitesdowntownocala.com/',
  },
  {
    name: 'Diamond Suites Ocala',
    address: '7494 SW 60th Ave, Suite A, Ocala, FL 34476',
    phone: '352-244-8352',
    href: 'https://diamondsuitesocala.com/',
  },
  {
    name: 'Diamond Suites Crystal River',
    address: '825 N Citrus Ave, Crystal River, FL 34428',
    phone: '352-244-8352',
    href: '/',
    internal: true,
  },
]

function LocationCard({ location }: { location: Location }) {
  const content = (
    <>
      <MapPin aria-hidden="true" />

      <div className="location-grid__content">
        <h3>{location.name}</h3>
        <p>{location.address}</p>
        <strong>{location.phone}</strong>
      </div>
    </>
  )

  if (location.internal) {
    return (
      <Link
        className="location-grid__card"
        to={location.href}
      >
        {content}
      </Link>
    )
  }

  return (
    <a
      className="location-grid__card"
      href={location.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  )
}

export function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Start a Conversation"
        title="Contact Diamond Suites"
        image="about-banner"
        description="Questions about a service, a professional, or suite availability? Reach out to our team."
      />

      <section className="marble-surface section-space">
        <div className="container contact-layout">
          {/* Contact details */}
          <aside
            className="contact-details"
            data-reveal
          >
            <header className="contact-details__heading">
              <p className="eyebrow">
                Contact Details
              </p>

              <h2 className="script-heading">
                We would love to hear from you
              </h2>
            </header>

            <div className="contact-details__links">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin aria-hidden="true" />

                <span>
                  {site.addressLine1}
                  <br />
                  {site.addressLine2}
                </span>
              </a>

              <a href={site.phoneHref}>
                <Phone aria-hidden="true" />
                <span>{site.phoneDisplay}</span>
              </a>

              <a href={`mailto:${site.email}`}>
                <Mail aria-hidden="true" />
                <span>{site.email}</span>
              </a>
            </div>

            <div
              className="contact-socials"
              aria-label="Social media"
            >
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Diamond Suites Crystal River on Facebook"
              >
                <Facebook aria-hidden="true" />
              </a>

              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Diamond Suites Crystal River on Instagram"
              >
                <Instagram aria-hidden="true" />
              </a>
            </div>

            <div className="map-frame">
              <iframe
                title="Diamond Suites Crystal River map"
                src="https://www.google.com/maps?q=825%20N%20Citrus%20Ave%20Crystal%20River%20FL%2034428&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </aside>

          {/* Contact form */}
          <div
            className="contact-form-section"
            data-reveal
          >
            <header className="contact-form-section__heading">
              <p className="eyebrow">
                Send a Message
              </p>

              <h2>
                Tell us how we can help
              </h2>
            </header>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="locations-section section-space">
        <div className="container">
          <header className="locations-section__heading">
            <p className="eyebrow centered">
              Our Florida Locations
            </p>

            <h2 className="script-heading centered">
              Three destinations, one Diamond standard
            </h2>
          </header>

          <div
            className="location-grid"
            data-reveal
          >
            {locations.map((location) => (
              <LocationCard
                key={location.name}
                location={location}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}