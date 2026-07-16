import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'

const gallery = [
  '/images/hallway.webp',
  '/images/lobby-wide.jpg',
  '/images/vanity.jpg',
  '/images/lobby-portrait.jpg',
  '/images/service-esthetician.jpeg',
  '/images/building.webp',
  '/images/service-lashes.jpg',
  '/images/service-hair.jpg',
]

export function About() {
  return (
    <>
      <PageHero eyebrow="Our Story" title="About Diamond Suites" image="/images/about-banner.webp" description="A vision of beauty, professionalism, comfort, and independent success." />
      <section className="marble-surface section-space">
        <div className="container split-layout split-layout--reverse">
          <div className="section-copy reveal-up">
            <p className="eyebrow">A Vision of Beauty and Excellence</p>
            <h2 className="script-heading">Designed for professionals.<br />Created for confidence.</h2>
            <div className="heading-rule" />
            <p>Diamond Suites was founded by Veronica Lake, whose passion for beauty and wellness inspired her to create elegant, professional spaces where clients and providers can thrive.</p>
            <p>From Ocala to Downtown and now Crystal River, each Diamond Suites location reflects a commitment to thoughtful design, comfort, and quality. Every detail, from the lighting to the layout, is chosen to create an inviting environment where professionals can offer exceptional care.</p>
          </div>
          <img className="feature-image" loading="lazy" src="/images/lobby-wide.jpg" alt="Diamond Suites reception and waiting area" />
        </div>
      </section>

      <section className="gallery-section section-space">
        <div className="container">
          <p className="eyebrow centered">Inside Crystal River</p>
          <h2 className="script-heading centered">Modern, Calm, and Carefully Finished</h2>
          <div className="masonry-gallery">
            {gallery.map((image, index) => <img loading="lazy" key={image} src={image} alt={`Diamond Suites Crystal River interior ${index + 1}`} />)}
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
