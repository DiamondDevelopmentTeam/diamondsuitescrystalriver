import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { professionals, site } from '../data/site'
import { assetUrl } from '../utils/assetUrl'

const serviceMoments = [
  { title: 'Skincare', image: 'images/service-esthetician.jpeg', position: 'center 48%' },
  { title: 'Hair', image: 'images/service-hair.jpg', position: 'center 44%' },
  { title: 'Lashes & brows', image: 'images/service-lashes.jpg', position: 'center 42%' },
  { title: 'Nails', image: 'images/service-nails.jpg', position: 'center 60%' },
]

const suiteFeatures = [
  'Modern finishes and elegant décor',
  'Independent climate control',
  'High-quality lighting and spacious layouts',
  'Sophisticated shared common areas',
]

const featuredProfessionals = professionals.slice(0, 3)

export function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__copy">
          <div className="home-hero__copy-inner" data-reveal>
            <p className="eyebrow eyebrow--light">Crystal River, Florida</p>
            <h1><span>Room to create.</span><span>A place to belong.</span></h1>
            <p className="home-hero__lead">Private salon suites and a calm, polished setting for independent beauty and wellness professionals—and the clients who choose them.</p>
            <div className="hero-actions">
              <Link className="button button--light" to="/contact">Inquire about a suite <ArrowRight aria-hidden="true" /></Link>
              <Link className="text-link text-link--light" to="/directory">Find a professional <ArrowUpRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
        <div className="home-hero__image">
          <img src={assetUrl('images/hero-lobby.webp')} alt="Bright reception lounge inside Diamond Suites Crystal River" width="1442" height="719" />
          <span className="image-caption">A quiet welcome on N Citrus Avenue</span>
        </div>
      </section>

      <section className="home-marker" aria-label="Diamond Suites Crystal River highlights">
        <div className="container home-marker__inner">
          <p><strong>Seven</strong><span>private suites</span></p>
          <p><strong>Beauty + wellness</strong><span>independent professionals</span></p>
          <p><strong>Crystal River</strong><span>825 N Citrus Avenue</span></p>
        </div>
      </section>

      <section className="editorial-intro section-space">
        <div className="container editorial-intro__grid">
          <figure className="editorial-intro__image" data-reveal>
            <img loading="lazy" src={assetUrl('images/lobby-wide.jpg')} alt="Natural-light lounge at Diamond Suites Crystal River" width="1536" height="2048" />
          </figure>
          <div className="editorial-intro__copy" data-reveal>
            <p className="eyebrow">The Crystal River experience</p>
            <h2>A refined setting with a relaxed point of view.</h2>
            <p className="lead-copy">Diamond Suites brings together private professional spaces and an inviting shared environment designed around comfort, focus, and thoughtful care.</p>
            <p>Each independently operated suite gives professionals a place to welcome clients in privacy, while the light-filled common areas make every arrival feel considered.</p>
            <Link className="text-link" to="/about">Step inside Crystal River <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="services-editorial section-space--small">
        <div className="container section-heading section-heading--split" data-reveal>
          <div>
            <p className="eyebrow">For every visit</p>
            <h2>Care, offered independently.</h2>
          </div>
          <p>Discover the beauty and wellness specialties represented by professionals at the Crystal River location. Appointments are made directly with each provider.</p>
        </div>
        <div className="service-ribbon" data-reveal>
          {serviceMoments.map((service) => (
            <Link to="/directory" className="service-moment" key={service.title}>
              <img loading="lazy" src={assetUrl(service.image)} alt="" width="1800" height="1200" style={{ objectPosition: service.position }} />
              <span>{service.title}<ArrowUpRight aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="suite-opportunity section-space">
        <div className="container suite-opportunity__grid">
          <div className="suite-opportunity__copy" data-reveal>
            <p className="eyebrow eyebrow--light">For independent professionals</p>
            <h2>Make the space<br />your own.</h2>
            <p>Build your client experience inside a private suite with polished finishes, practical details, and the independence to run your business your way.</p>
            <ul className="check-list">
              {suiteFeatures.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}
            </ul>
            <Link className="button button--brass" to="/contact">Ask about availability <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="suite-opportunity__visual" data-reveal>
            <img loading="lazy" src={assetUrl('images/hallway.webp')} alt="Hallway leading to private salon suites" width="473" height="630" />
            <p><span>01—07</span>Private rooms for independent work</p>
          </div>
        </div>
      </section>

      <section className="professional-preview section-space">
        <div className="container">
          <div className="section-heading section-heading--split" data-reveal>
            <div>
              <p className="eyebrow">Inside the suites</p>
              <h2>Meet a few of our professionals.</h2>
            </div>
            <Link className="text-link" to="/directory">View the full directory <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="professional-preview__list">
            {featuredProfessionals.map((professional) => (
              <article key={professional.suite} data-reveal>
                <img loading="lazy" src={assetUrl(professional.image)} alt={professional.name} width="480" height="600" />
                <div>
                  <span>Suite {String(professional.suite).padStart(2, '0')}</span>
                  <p>{professional.title}</p>
                  <h3>{professional.name}</h3>
                  {professional.businessName ? <small>{professional.businessName}</small> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="visual-tour section-space">
        <div className="container visual-tour__heading" data-reveal>
          <p className="eyebrow">A closer look</p>
          <h2>Light, calm, and carefully finished.</h2>
          <Link className="text-link" to="/about">Explore the gallery <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="container visual-tour__grid" data-reveal>
          <img loading="lazy" src={assetUrl('images/lobby-window.jpg')} alt="Window-side seating in the Crystal River lounge" width="1536" height="2048" />
          <img loading="lazy" src={assetUrl('images/vanity.jpg')} alt="Private suite vanity and mirror" width="1536" height="2048" />
          <img loading="lazy" src={assetUrl('images/about-banner.webp')} alt="Reception details inside Diamond Suites Crystal River" width="1442" height="719" />
        </div>
      </section>

      <section className="location-feature">
        <div className="location-feature__image">
          <img loading="lazy" src={assetUrl('images/building.webp')} alt="Diamond Suites Crystal River exterior at 825 N Citrus Avenue" width="925" height="548" />
        </div>
        <div className="location-feature__copy" data-reveal>
          <p className="eyebrow eyebrow--light">Find us in Crystal River</p>
          <h2>Your next visit starts here.</h2>
          <address>{site.addressLine1}<br />{site.addressLine2}</address>
          <div className="location-feature__links">
            <a href={site.phoneHref}><Phone aria-hidden="true" />{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}><Mail aria-hidden="true" />{site.email}</a>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true" />Get directions <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </>
  )
}
