import { Gem, Lightbulb, ShieldCheck, Snowflake, Sparkles, Star, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { assetUrl } from '../utils/assetUrl'

const amenities = [
  { icon: Sparkles, text: 'Modern finishes and elegant décor' },
  { icon: Snowflake, text: 'Independent climate control for personalized comfort' },
  { icon: Lightbulb, text: 'High-quality lighting and spacious layouts' },
  { icon: Users, text: 'Shared common areas designed with sophistication and ease' },
]

const values = [
  { icon: Gem, title: 'Excellence', text: 'We strive for the highest standards in every aspect of our environment and operations.' },
  { icon: ShieldCheck, title: 'Integrity', text: 'We conduct business with honesty, transparency, and respect for our professionals and guests.' },
  { icon: Star, title: 'Guest-Centric Service', text: 'We prioritize comfort, satisfaction, and an experience that feels thoughtful from arrival to departure.' },
]

export function Suites() {
  return (
    <>
      <PageHero eyebrow="Private Salon Suites" title="Private. Polished. Perfectly Designed." image="images/suites-banner.webp" description="Seven elegant suites crafted to support independent beauty and wellness professionals." />

      <section className="marble-surface section-space">
        <div className="container split-layout">
          <img className="feature-image feature-image--portrait" loading="lazy" src={assetUrl('images/hallway.webp')} alt="Hallway leading to private suites" />
          <div className="section-copy reveal-up">
            <p className="eyebrow">Suites at Crystal River</p>
            <h2 className="script-heading">A refined space for your business to grow</h2>
            <div className="heading-rule" />
            <p>Diamond Suites Crystal River features seven beautifully designed private suites, each crafted to enhance client comfort and professional function.</p>
            <p>The building is serene, clean, and meticulously maintained, reflecting the Diamond Suites standard of excellence.</p>
            <p>Whether you are a beauty professional seeking an elevated home for your business or a client looking for a destination that feels private and luxurious, the experience is designed to impress.</p>
            <Link className="button button--dark" to="/contact">Ask About Availability</Link>
          </div>
        </div>
      </section>

      <section className="amenities-section section-space">
        <div className="container">
          <p className="eyebrow centered">Included in the Experience</p>
          <h2 className="script-heading centered">Details That Make the Difference</h2>
          <div className="amenities-grid">
            {amenities.map(({ icon: Icon, text }) => (
              <article key={text}><span><Icon /></span><h3>{text}</h3></article>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section section-space">
        <div className="container values-grid">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon />
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
