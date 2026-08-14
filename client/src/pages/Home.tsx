import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { professionals, site } from '../data/site'
import type { ImageKey } from '../data/images'

const serviceMoments: { title: string; titleLines: string[]; note: string; image: ImageKey; position: string; className: string }[] = [
  { title: 'Skincare', titleLines: ['Skin', 'care'], note: 'Advanced care / tailored rituals', image: 'service-esthetician', position: 'center 48%', className: 'service-lookbook__item--skin' },
  { title: 'Hair', titleLines: ['Hair'], note: 'Color / blonding / extensions', image: 'service-hair', position: 'center 44%', className: 'service-lookbook__item--hair' },
  { title: 'Lashes & brows', titleLines: ['Lashes', '& brows'], note: 'Precision / definition', image: 'service-lashes', position: 'center 42%', className: 'service-lookbook__item--lashes' },
  { title: 'Nails', titleLines: ['Nails'], note: 'Classic / custom artistry', image: 'service-nails', position: 'center 60%', className: 'service-lookbook__item--nails' },
]

const galleryImages: { image: ImageKey; alt: string; position: string }[] = [
  {
    image: 'lobby-window',
    alt: 'Window-side seating in the Crystal River lounge',
    position: 'center 45%',
  },
  {
    image: 'lobby-portrait',
    alt: 'Seating and polished details in the Crystal River lounge',
    position: 'center 46%',
  },
  {
    image: 'vanity',
    alt: 'Private suite vanity and mirror',
    position: 'center 42%',
  },
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
          <ResponsiveImage image="hero-lobby" alt="Bright reception lounge inside Diamond Suites Crystal River" sizes="(max-width: 900px) 100vw, 54vw" priority objectFit="cover" />
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
            <ResponsiveImage image="lobby-wide" alt="Natural-light lounge at Diamond Suites Crystal River" sizes="(max-width: 900px) min(100vw - 40px, 620px), 590px" objectFit="cover" objectPosition="50% 44%" />
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

      <section className="services-editorial">
        <div className="services-editorial__heading container" data-reveal>
          <div>
            <p className="eyebrow">01 / Four disciplines</p>
            <h2>Beauty,<br />in practice.</h2>
          </div>
          <p><span>Independent care</span>Discover the beauty and wellness specialties represented at Crystal River. Appointments are made directly with each provider.</p>
        </div>

        <div className="service-lookbook container" aria-label="Services at Diamond Suites Crystal River">
          <span className="service-lookbook__ghost" aria-hidden="true">DISCIPLINES</span>
          {serviceMoments.map((service, index) => (
            <Link to="/directory" className={`service-lookbook__item ${service.className}`} key={service.title} aria-label={`Explore ${service.title} professionals`}>
              <figure className="service-lookbook__media" data-reveal>
                <ResponsiveImage
                  image={service.image}
                  alt={`${service.title} service detail`}
                  sizes={index === 0 ? '(max-width: 640px) 72vw, (max-width: 900px) 62vw, 52vw' : '(max-width: 640px) 48vw, (max-width: 900px) 42vw, 38vw'}
                  objectFit="cover"
                  objectPosition={service.position}
                />
              </figure>
              <div className="service-lookbook__label" data-reveal>
                <span className="service-lookbook__number">{String(index + 1).padStart(2, '0')} / 04</span>
                <h3>{service.titleLines.map((line) => <span key={line}>{line}</span>)}</h3>
                <p>{service.note}</p>
                <ArrowUpRight aria-hidden="true" />
              </div>
            </Link>
          ))}
          <p className="service-lookbook__axis" aria-hidden="true">825 N CITRUS AVE / CRYSTAL RIVER / FL</p>
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
            <ResponsiveImage image="hallway" alt="Hallway leading to private salon suites" sizes="(max-width: 900px) min(90vw, 650px), 42vw" objectFit="cover" objectPosition="center" />
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
                <ResponsiveImage image={professional.image} alt={professional.name} sizes="(max-width: 640px) 42vw, (max-width: 1100px) 180px, 14vw" objectFit="cover" objectPosition={professional.imagePosition ?? 'center top'} />
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
          <div>
            <p className="eyebrow">A closer look</p>
            <h2>Light, calm, and carefully finished.</h2>
          </div>
          <Link className="text-link" to="/gallery">Explore the gallery <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="container visual-tour__grid" data-reveal>
          {galleryImages.map((galleryImage) => (
            <ResponsiveImage
              key={galleryImage.image}
              image={galleryImage.image}
              alt={galleryImage.alt}
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 900px) calc((100vw - 52px) / 2), (max-width: 1296px) calc((100vw - 96px) / 3), 400px"
              pictureClassName="visual-tour__item"
              objectFit="cover"
              objectPosition={galleryImage.position}
            />
          ))}
        </div>
      </section>

      <section className="location-feature">
        <div className="location-feature__image">
          <ResponsiveImage image="building" alt="Diamond Suites Crystal River exterior at 825 N Citrus Avenue" sizes="(max-width: 900px) 100vw, 62vw" objectFit="cover" objectPosition="center" />
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
