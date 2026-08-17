import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { ResponsiveImage } from '../components/ResponsiveImage'
import type { ImageKey } from '../data/images'

const gallery: {
  image: ImageKey
  alt: string
  position: string
}[] = [
  {
    image: 'lobby-window',
    alt: 'Window-side seating in the shared lounge',
    position: 'center 46%',
  },
  {
    image: 'hallway',
    alt: 'Hallway connecting the private salon suites',
    position: 'center',
  },
  {
    image: 'vanity',
    alt: 'A private suite vanity with professional lighting',
    position: 'center 42%',
  },
  {
    image: 'lobby-portrait',
    alt: 'Comfortable seating and natural light in the lobby',
    position: 'center 48%',
  },
  {
    image: 'service-esthetician',
    alt: 'A calm treatment room prepared for a client',
    position: 'center 48%',
  },
  {
    image: 'service-lashes',
    alt: 'A thoughtfully arranged lash and brow suite',
    position: 'center 44%',
  },
  {
    image: 'service-hair',
    alt: 'A polished independent hair studio',
    position: 'center 45%',
  },
  {
    image: 'building',
    alt: 'The Diamond Suites Crystal River exterior',
    position: 'center',
  },
]

const leftColumn = gallery
  .map((item, index) => ({
    ...item,
    originalIndex: index,
  }))
  .filter((item) => item.originalIndex % 2 === 0)

const rightColumn = gallery
  .map((item, index) => ({
    ...item,
    originalIndex: index,
  }))
  .filter((item) => item.originalIndex % 2 === 1)

export function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="The Spaces"
        title="Inside Crystal River"
        image="lobby-wide"
        description="Light, texture, and considered details throughout our shared spaces and private suites."
      />

      <section className="gallery-page section-space">
        {/* =========================
            INTRO
            ========================= */}
        <div
          className="container gallery-page__intro"
          data-reveal
        >
          <p className="eyebrow">
            A closer look
          </p>

          <h2 className="script-heading">
            Designed for calm.
            <br />
            Made for independent work.
          </h2>

          <p>
            Explore the atmosphere at Diamond Suites Crystal River—from the
            arrival experience to the individual studios where beauty and
            wellness professionals make the space their own.
          </p>
        </div>

        {/* =========================
            GALLERY

            First 4 images:
            priority loading

            Remaining images:
            normal lazy loading
            ========================= */}
        <div className="container gallery-page__grid">
          {/* LEFT COLUMN */}
          <div className="gallery-page__column">
            {leftColumn.map((item) => {
              const shouldPrioritize = item.originalIndex < 4

              return (
                <figure
                  className="gallery-page__item"
                  key={item.image}
                >
                  <ResponsiveImage
                    image={item.image}
                    alt={item.alt}
                    sizes="
                      (max-width: 640px) calc(100vw - 32px),
                      (max-width: 900px) calc(50vw - 28px),
                      (max-width: 1400px) calc(50vw - 60px),
                      640px
                    "
                    objectFit="cover"
                    objectPosition={item.position}
                    priority={shouldPrioritize}
                  />

                  {/* <figcaption>
                    {String(item.originalIndex + 1).padStart(2, '0')}
                    {' / '}
                    Crystal River
                  </figcaption> */}
                </figure>
              )
            })}
          </div>

          {/* RIGHT COLUMN */}
          <div className="gallery-page__column">
            {rightColumn.map((item) => {
              const shouldPrioritize = item.originalIndex < 4

              return (
                <figure
                  className="gallery-page__item"
                  key={item.image}
                >
                  <ResponsiveImage
                    image={item.image}
                    alt={item.alt}
                    sizes="
                      (max-width: 640px) calc(100vw - 32px),
                      (max-width: 900px) calc(50vw - 28px),
                      (max-width: 1400px) calc(50vw - 60px),
                      640px
                    "
                    objectFit="cover"
                    objectPosition={item.position}
                    priority={shouldPrioritize}
                  />
{/* 
                  <figcaption>
                    {String(item.originalIndex + 1).padStart(2, '0')}
                    {' / '}
                    Crystal River
                  </figcaption> */}
                </figure>
              )
            })}
          </div>
        </div>

        {/* =========================
            CTA
            ========================= */}
        <div
          className="container gallery-page__cta"
          data-reveal
        >
          <p>
            Ready to see the suites in person?
          </p>

          <Link
            className="text-link"
            to="/contact"
          >
            Schedule a visit
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}