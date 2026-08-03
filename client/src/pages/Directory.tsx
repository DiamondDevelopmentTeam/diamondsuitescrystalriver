import { ArrowRight, ArrowUpRight, ExternalLink, Mail, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { PageHero } from '../components/PageHero'
import { ResponsiveImage } from '../components/ResponsiveImage'
import type { ImageKey } from '../data/images'
import { professionals, unlistedSuites, type Professional, type UnlistedSuite } from '../data/site'

type DirectoryEntry = Professional | UnlistedSuite

const directoryEntries: DirectoryEntry[] = [...professionals, ...unlistedSuites].sort((a, b) => a.suite - b.suite)

function isProfessional(entry: DirectoryEntry): entry is Professional {
  return 'name' in entry
}

function ProfessionalPortrait({ src, name, position }: { src: ImageKey; name: string; position?: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className="professional-card__fallback"><strong>{name}</strong></div>
  }

  return <ResponsiveImage image={src} alt={name} sizes="(max-width: 640px) 100vw, (max-width: 900px) 42vw, 22vw" objectFit="cover" objectPosition={position ?? 'center top'} onError={() => setFailed(true)} />
}

export function Directory() {
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!selectedProfessional) return

    const dialog = dialogRef.current
    if (!dialog) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setSelectedProfessional(null)
      window.requestAnimationFrame(() => lastTriggerRef.current?.focus())
    }

    if (!dialog.open) dialog.showModal()
    window.addEventListener('keydown', handleKeyDown)
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
    }
  }, [selectedProfessional])

  const openProfile = (professional: Professional, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger
    setSelectedProfessional(professional)
  }

  const closeProfile = () => {
    setSelectedProfessional(null)
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }

  return (
    <>
      <PageHero eyebrow="Seven Private Suites" title="Meet Our Professionals" image="directory-banner" description="Discover the independent beauty and wellness specialists who make Diamond Suites Crystal River shine." />
      <section className="marble-surface section-space">
        <div className="container directory-intro centered">
          <p className="eyebrow">The Crystal River Directory</p>
          <h2 className="script-heading">Select a suite to meet the professional inside</h2>
          <p>Each professional operates an independent business in a private suite, providing personalized service in a comfortable, elegant setting.</p>
        </div>
        <div className="container directory-grid">
          {directoryEntries.map((entry) => {
            if (!isProfessional(entry)) {
              return (
                <article className="professional-card professional-card--unlisted" key={entry.suite}>
                  <div className="professional-card__image">
                    <ResponsiveImage image={entry.image} alt="Hallway outside the private suites" sizes="(max-width: 640px) 100vw, (max-width: 900px) 42vw, 22vw" objectFit="cover" objectPosition={entry.imagePosition ?? 'center'} />
                    <span>Suite {entry.suite}</span>
                  </div>
                  <div className="professional-card__body">
                    <p className="eyebrow">Directory update</p>
                    <h2>{entry.heading}</h2>
                    <p>{entry.note}</p>
                  </div>
                </article>
              )
            }

            return (
              <article className="professional-card" key={entry.suite}>
                <div className="professional-card__image">
                  <ProfessionalPortrait src={entry.image} name={entry.name} position={entry.imagePosition} />
                  <span>Suite {entry.suite}</span>
                </div>
                <div className="professional-card__body">
                  <p className="eyebrow">{entry.title}</p>
                  <h2>{entry.name}</h2>
                  {entry.businessName ? <h3>{entry.businessName}</h3> : null}
                  {entry.services?.length ? (
                    <ul className="professional-services professional-services--preview" aria-label={`${entry.name} specialties`}>
                      {entry.services.slice(0, 3).map((service) => <li key={service}>{service}</li>)}
                    </ul>
                  ) : null}
                  <div className="professional-card__actions">
                    <button className="button button--dark" type="button" onClick={(event) => openProfile(entry, event.currentTarget)} aria-haspopup="dialog">
                      View profile <ArrowRight aria-hidden="true" />
                    </button>
                    {entry.bookingUrl ? (
                      <a className="text-link" href={entry.bookingUrl} target="_blank" rel="noopener noreferrer">
                        Book now <ArrowUpRight aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="profile-dialog"
        aria-labelledby={selectedProfessional ? `profile-title-${selectedProfessional.suite}` : undefined}
        aria-describedby={selectedProfessional ? `profile-bio-${selectedProfessional.suite}` : undefined}
        onCancel={(event) => {
          event.preventDefault()
          closeProfile()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProfile()
        }}
      >
        {selectedProfessional ? (
          <div className="profile-dialog__panel">
            <header className="profile-dialog__header">
              <span>Suite {selectedProfessional.suite}</span>
              <button ref={closeButtonRef} type="button" onClick={closeProfile} aria-label={`Close ${selectedProfessional.name} profile`}>
                <X aria-hidden="true" />
              </button>
            </header>
            <div className="profile-dialog__scroll">
              <div className="profile-dialog__layout">
                <aside className="profile-dialog__aside">
                  <div className="profile-dialog__portrait">
                    <ProfessionalPortrait src={selectedProfessional.image} name={selectedProfessional.name} position={selectedProfessional.imagePosition} />
                  </div>
                  {selectedProfessional.services?.length ? (
                    <div className="profile-dialog__services">
                      <p className="eyebrow">Services & specialties</p>
                      <ul className="professional-services">
                        {selectedProfessional.services.map((service) => <li key={service}>{service}</li>)}
                      </ul>
                    </div>
                  ) : null}
                </aside>
                <div className="profile-dialog__content">
                  <p className="eyebrow">{selectedProfessional.title}</p>
                  <h2 id={`profile-title-${selectedProfessional.suite}`}>{selectedProfessional.name}</h2>
                  {selectedProfessional.businessName ? <h3>{selectedProfessional.businessName}</h3> : null}
                  <div className="profile-dialog__bio" id={`profile-bio-${selectedProfessional.suite}`}>
                    {selectedProfessional.bio.map((paragraph, index) => <p key={`${selectedProfessional.suite}-${index}`}>{paragraph}</p>)}
                  </div>

                  {(selectedProfessional.bookingUrl || selectedProfessional.phone || selectedProfessional.email) ? (
                    <div className="profile-dialog__actions" aria-label={`${selectedProfessional.name} contact options`}>
                      {selectedProfessional.bookingUrl ? (
                        <a className="button button--brass" href={selectedProfessional.bookingUrl} target="_blank" rel="noopener noreferrer">
                          Book now <ArrowUpRight aria-hidden="true" />
                        </a>
                      ) : null}
                      {selectedProfessional.phone ? (
                        <a className="button button--dark" href={`tel:+1${selectedProfessional.phone.replace(/\D/g, '')}`}>
                          <Phone aria-hidden="true" /> {selectedProfessional.phone}
                        </a>
                      ) : null}
                      {selectedProfessional.email ? (
                        <a className="profile-dialog__contact-link" href={`mailto:${selectedProfessional.email}`}>
                          <Mail aria-hidden="true" /> {selectedProfessional.email}
                        </a>
                      ) : null}
                    </div>
                  ) : null}

                  {(selectedProfessional.websiteUrl || selectedProfessional.socialLinks?.length) ? (
                    <div className="profile-dialog__external-links">
                      {selectedProfessional.websiteUrl ? (
                        <a href={selectedProfessional.websiteUrl} target="_blank" rel="noopener noreferrer">
                          Visit website <ExternalLink aria-hidden="true" />
                        </a>
                      ) : null}
                      {selectedProfessional.socialLinks?.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label} <ExternalLink aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  )
}
