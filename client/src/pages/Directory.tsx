import { Phone } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { professionals } from '../data/site'

export function Directory() {
  return (
    <>
      <PageHero eyebrow="Seven Private Suites" title="Meet Our Professionals" image="/images/directory-banner.webp" description="Discover the independent beauty and wellness specialists who make Diamond Suites Crystal River shine." />
      <section className="marble-surface section-space">
        <div className="container directory-intro centered">
          <p className="eyebrow">The Crystal River Directory</p>
          <h2 className="script-heading">Select a suite to meet the professional inside</h2>
          <p>Each professional operates an independent business in a private suite, providing personalized service in a comfortable, elegant setting.</p>
        </div>
        <div className="container directory-grid">
          {professionals.map((professional) => (
            <article className="professional-card" key={professional.suite}>
              <div className="professional-card__image">
                <img loading="lazy" src={professional.image} alt={professional.name} />
                <span>Suite {professional.suite}</span>
              </div>
              <div className="professional-card__body">
                <p className="eyebrow">{professional.specialty}</p>
                <h2>{professional.name}</h2>
                <h3>{professional.business}</h3>
                <p>{professional.summary}</p>
                {professional.phone ? <a className="button button--dark" href={`tel:+1${professional.phone.replace(/\D/g, '')}`}><Phone /> Book Now: {professional.phone}</a> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
