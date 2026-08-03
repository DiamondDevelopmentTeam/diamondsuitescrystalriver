import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { ResponsiveImage } from '../components/ResponsiveImage'
import type { ImageKey } from '../data/images'

const gallery: { image: ImageKey; alt: string; position: string }[] = [
  { image: 'hallway', alt: 'Hallway connecting the private salon suites', position: 'center' },
  { image: 'lobby-window', alt: 'Window-side seating in the shared lounge', position: 'center 46%' },
  { image: 'vanity', alt: 'A private suite vanity with professional lighting', position: 'center 42%' },
  { image: 'lobby-portrait', alt: 'Comfortable seating and natural light in the lobby', position: 'center 48%' },
  { image: 'service-esthetician', alt: 'A calm treatment room prepared for a client', position: 'center 48%' },
  { image: 'service-lashes', alt: 'A thoughtfully arranged lash and brow suite', position: 'center 44%' },
  { image: 'service-hair', alt: 'A polished independent hair studio', position: 'center 45%' },
  { image: 'building', alt: 'The Diamond Suites Crystal River exterior', position: 'center' },
]

export function About() {
  return (
    <>
      <PageHero eyebrow="Our Story" title="About Diamond Suites" image="about-banner" description="A vision of beauty, professionalism, comfort, and independent success." />
      <section className="marble-surface section-space">
        <div className="container split-layout split-layout--reverse about-story">
          <div className="section-copy reveal-up">
            <p className="eyebrow">A Vision of Beauty and Excellence</p>
            <h2 className="script-heading">Designed for professionals.<br />Created for confidence.</h2>
            <div className="heading-rule" />
            <p>Diamond Suites was founded by Veronica Lake, whose passion for beauty and wellness inspired her to create elegant, professional spaces for clients and independent providers.</p>
            <p>From Ocala to Downtown and now Crystal River, each Diamond Suites location reflects a commitment to thoughtful design, comfort, and quality. Every detail, from the lighting to the layout, is chosen to create an inviting environment where professionals can offer exceptional care.</p>
          </div>
          <ResponsiveImage className="feature-image" image="lobby-wide" alt="Diamond Suites reception and waiting area" sizes="(max-width: 900px) min(100vw - 40px, 560px), 560px" objectFit="cover" objectPosition="center 45%" />
        </div>
      </section>

      <section className="gallery-section section-space">
        <div className="container">
          <p className="eyebrow centered">Inside Crystal River</p>
          <h2 className="script-heading centered">Modern, Calm, and Carefully Finished</h2>
          <div className="about-gallery">
            {gallery.map((item, index) => (
              <figure className={index < 4 ? 'about-gallery__portrait' : 'about-gallery__landscape'} key={item.image}>
                <ResponsiveImage
                  image={item.image}
                  alt={item.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 25vw"
                  objectFit="cover"
                  objectPosition={item.position}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-cta section-space">
        <div className="container dark-cta__inner">
          <div>
            <p className="eyebrow">The New Crystal River Location</p>
            <h2 className="script-heading">Seven private suites. One elevated experience.</h2>
            <p>Our newest facility continues the Diamond Suites tradition with seven private suites dedicated to hair styling, lash and brow artistry, nail design, wellness, and esthetic treatments.</p>
            <p>Step inside a welcoming space built for connection, confidence, and care.</p>
          </div>
          <Link className="button button--gold" to="/contact">Schedule a Visit</Link>
        </div>
      </section>
    </>
  )
}
