import { ChevronLeft, ChevronRight, MapPin, Sparkles, Users, WandSparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const lobbySlides = [
  '/images/lobby-portrait.jpg',
  '/images/lobby-window.jpg',
  '/images/lobby-wide.jpg',
]

const services = [
  { title: 'Esthetician', image: '/images/service-esthetician.jpeg' },
  { title: 'Nail Technician', image: '/images/service-nails.jpg' },
  { title: 'Eye Lashes', image: '/images/service-lashes.jpg' },
  { title: 'Hair Stylist', image: '/images/service-hair.jpg' },
]

const benefits = [
  { icon: Sparkles, title: 'Beautifully Designed Suites', text: 'Modern finishes, elegant décor, and exceptional lighting create a polished setting for work and relaxation.' },
  { icon: Users, title: 'Professional Yet Personal', text: 'A boutique environment that feels refined, comfortable, and more personal than a traditional salon complex.' },
  { icon: WandSparkles, title: 'Independent Professionals', text: 'Each specialist operates an independent business while sharing a commitment to excellent client care.' },
  { icon: MapPin, title: 'Convenient Location', text: 'Easy access, complimentary parking, and a serene Crystal River setting away from the bustle.' },
]

export function Home() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % lobbySlides.length), 5200)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <section className="home-hero">
        <img src="/images/hero-lobby.webp" alt="Diamond Suites Crystal River lobby" />
        <div className="home-hero__panel reveal-up">
          <p>Welcome to</p>
          <h1>Diamond Crystal River</h1>
          <span>Your destination for beauty, wellness, and relaxation</span>
        </div>
      </section>

      <section className="intro-section marble-surface section-space">
        <div className="container split-layout">
          <div className="image-stack reveal-up">
            <div className="image-stack__frame" />
            <img src={lobbySlides[slide]} alt="Interior of Diamond Suites Crystal River" />
            <button className="slider-arrow slider-arrow--left" type="button" onClick={() => setSlide((slide - 1 + lobbySlides.length) % lobbySlides.length)} aria-label="Previous interior photo"><ChevronLeft /></button>
            <button className="slider-arrow slider-arrow--right" type="button" onClick={() => setSlide((slide + 1) % lobbySlides.length)} aria-label="Next interior photo"><ChevronRight /></button>
            <div className="slider-dots" aria-label="Interior photo selector">
              {lobbySlides.map((item, index) => (
                <button key={item} type="button" className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} aria-label={`View interior photo ${index + 1}`} />
              ))}
            </div>
          </div>

          <div className="section-copy reveal-up">
            <p className="eyebrow">Luxury Salon Suites</p>
            <h2 className="script-heading">Diamond Suites<br />Crystal River</h2>
            <div className="heading-rule" />
            <p>Your destination for beauty, wellness, and relaxation. Located in the heart of Crystal River, this newest Diamond Suites location brings the same level of excellence and comfort that has made our Ocala and Downtown facilities so well-loved.</p>
            <p>Beauty professionals and wellness experts come together in a refined environment designed to elevate every visit. Each suite blends privacy, style, and luxury, offering clients a place where quality care meets a calming atmosphere.</p>
            <p>Whether you are visiting for hair, lashes, nails, or skincare, you will find everything you need to look and feel your best.</p>
            <strong>Your journey to beauty and wellness begins here.</strong>
            <Link className="text-link" to="/about">Discover our story →</Link>
          </div>
        </div>
      </section>

      <section className="services-strip section-space--small">
        <div className="services-track container">
          {services.map((service) => (
            <Link to="/directory" className="service-card" key={service.title}>
              <img loading="lazy" src={service.image} alt={service.title} />
              <h3>{service.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="excellence-section">
        <div className="excellence-image">
          <img loading="lazy" src="/images/lobby-portrait.jpg" alt="Elegant seating area at Diamond Suites Crystal River" />
        </div>
        <div className="excellence-copy section-space reveal-up">
          <h2 className="script-heading">Where Beauty Meets Excellence</h2>
          <p>Every detail matters, from the way a client is greeted to the atmosphere surrounding them.</p>
          <p>Our location was built with one goal: to provide a private, luxurious space where beauty and wellness professionals can flourish and clients can relax.</p>
          <strong>Why professionals and clients choose Diamond Suites:</strong>
          <div className="benefits-list">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <span><Icon /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-collage marble-surface section-space">
        <div className="container story-collage__grid">
          <div className="story-collage__copy reveal-up">
            <h2 className="script-heading">Diamond Suites<br />Crystal River</h2>
            <div className="heading-rule" />
            <p>Nestled in the heart of Crystal River, our newest location reflects everything the Diamond Suites brand stands for: beauty, professionalism, and comfort.</p>
            <p>As the third addition to the Diamond Suites family, this location continues our mission to provide high-quality spaces for independent beauty and wellness professionals to thrive.</p>
            <p>From lash and brow artistry to hair, nails, and skincare, a variety of experts are ready to help you look and feel your best.</p>
          </div>
          <div className="collage-grid">
            <img loading="lazy" src="/images/coffee-station.jpg" alt="Coffee station" />
            <img loading="lazy" src="/images/service-hair.jpg" alt="Hair styling" />
            <img loading="lazy" src="/images/service-nails.jpg" alt="Nail service" />
            <img loading="lazy" src="/images/hero-lobby.webp" alt="Salon lobby" />
          </div>
        </div>
      </section>

      <section className="final-cta">
        <img loading="lazy" src="/images/building.webp" alt="Diamond Suites Crystal River exterior" />
        <div>
          <h2 className="script-heading">The Next Chapter in Beauty and Wellness Excellence</h2>
          <Link className="button button--gold" to="/contact">Contact Us Today</Link>
        </div>
      </section>
      <p className="final-tagline script-heading">Your Destination for Beauty, Wellness, and Relaxation</p>
    </>
  )
}
