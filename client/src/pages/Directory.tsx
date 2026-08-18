import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Mail,
  Phone,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { PageHero } from '../components/PageHero'
import {
  professionals,
  type Professional,
} from '../data/professionals'

type ProfessionalPortraitProps = {
  professional: Professional
  eager?: boolean
}

function getSuiteLabel(professional: Professional) {
  if (professional.suiteLabel) {
    return professional.suiteLabel
  }

  if (professional.suite) {
    return `Suite ${professional.suite}`
  }

  return null
}

function ProfessionalPortrait({
  professional,
  eager = false,
}: ProfessionalPortraitProps) {
  const [failed, setFailed] = useState(false)

  if (!professional.imageUrl || failed) {
    return (
      <div
        className="professional-card__fallback professional-card__fallback--initial"
        aria-label={professional.name}
      >
        <strong>
          {professional.initial ?? professional.name.charAt(0).toUpperCase()}
        </strong>
      </div>
    )
  }

  return (
    <img
      src={professional.imageUrl}
      alt={professional.name}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      style={{
        objectPosition: professional.imagePosition ?? 'center top',
      }}
      onError={() => setFailed(true)}
    />
  )
}

export function Directory() {
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null)

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

      window.requestAnimationFrame(() => {
        lastTriggerRef.current?.focus()
      })
    }

    if (!dialog.open) {
      dialog.showModal()
    }

    window.addEventListener('keydown', handleKeyDown)

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow

      if (dialog.open) {
        dialog.close()
      }
    }
  }, [selectedProfessional])

  const openProfile = (
    professional: Professional,
    trigger: HTMLButtonElement,
  ) => {
    lastTriggerRef.current = trigger
    setSelectedProfessional(professional)
  }

  const closeProfile = () => {
    setSelectedProfessional(null)

    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus()
    })
  }

  return (
    <>
      <PageHero
        eyebrow="Meet the Professionals"
        title="Our Crystal River Professionals"
        image="directory-banner"
        description="Explore the independent beauty, wellness, and healthcare professionals at Diamond Suites Crystal River."
      />

      <section className="marble-surface section-space">
        <div
          className="container directory-intro centered"
          data-reveal
        >
          <p className="eyebrow">
            Crystal River Directory
          </p>

          <h2 className="script-heading">
            Meet the professionals inside Diamond Suites
          </h2>

          <p>
            Open a profile to learn more about each independent
            professional, their specialties, photos, and available booking
            information.
          </p>
        </div>

        <div className="container directory-grid">
          {professionals.map((professional, index) => {
            const suiteLabel = getSuiteLabel(professional)

            return (
              <article
                className="professional-card"
                key={professional.id}
                data-reveal
              >
                <div className="professional-card__image">
                  <ProfessionalPortrait
                    professional={professional}
                    eager={index < 2}
                  />

                  {suiteLabel ? (
                    <span>{suiteLabel}</span>
                  ) : null}
                </div>

                <div className="professional-card__body">
                  <p className="eyebrow">
                    {professional.title}
                  </p>

                  <h2>{professional.name}</h2>

                  {professional.businessName ? (
                    <h3>{professional.businessName}</h3>
                  ) : null}

                  {professional.services?.length ? (
                    <ul
                      className="professional-services professional-services--preview"
                      aria-label={`${professional.name} specialties`}
                    >
                      {professional.services
                        .slice(0, 3)
                        .map((service) => (
                          <li key={service}>
                            {service}
                          </li>
                        ))}
                    </ul>
                  ) : null}

                  <div className="professional-card__actions">
                    <button
                      className="button button--dark"
                      type="button"
                      onClick={(event) =>
                        openProfile(
                          professional,
                          event.currentTarget,
                        )
                      }
                      aria-haspopup="dialog"
                    >
                      View profile
                      <ArrowRight aria-hidden="true" />
                    </button>

                    {professional.bookingUrl ? (
                      <a
                        className="text-link"
                        href={professional.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book now
                        <ArrowUpRight aria-hidden="true" />
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
        aria-labelledby={
          selectedProfessional
            ? `profile-title-${selectedProfessional.id}`
            : undefined
        }
        aria-describedby={
          selectedProfessional
            ? `profile-bio-${selectedProfessional.id}`
            : undefined
        }
        onCancel={(event) => {
          event.preventDefault()
          closeProfile()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeProfile()
          }
        }}
      >
        {selectedProfessional ? (
          <div className="profile-dialog__panel">
            <header className="profile-dialog__header">
              <span>
                {getSuiteLabel(selectedProfessional) ??
                  'Professional Profile'}
              </span>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeProfile}
                aria-label={`Close ${selectedProfessional.name} profile`}
              >
                <X aria-hidden="true" />
              </button>
            </header>

            <div className="profile-dialog__scroll">
              <div className="profile-dialog__layout">
                <aside className="profile-dialog__aside">
                  <div className="profile-dialog__portrait">
                    <ProfessionalPortrait
                      professional={selectedProfessional}
                      eager
                    />
                  </div>

                  {selectedProfessional.gallery?.length ? (
                    <div className="profile-dialog__gallery">
                      {selectedProfessional.gallery.map(
                        (image) => (
                          <figure key={image.src}>
                            <img
                              src={image.src}
                              alt={image.alt}
                              loading="lazy"
                              decoding="async"
                              style={{
                                objectPosition:
                                  image.position ?? 'center',
                              }}
                            />
                          </figure>
                        ),
                      )}
                    </div>
                  ) : null}

                  {selectedProfessional.services?.length ? (
                    <div className="profile-dialog__services">
                      <p className="eyebrow">
                        Services & specialties
                      </p>

                      <ul className="professional-services">
                        {selectedProfessional.services.map(
                          (service) => (
                            <li key={service}>
                              {service}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  ) : null}
                </aside>

                <div className="profile-dialog__content">
                  <p className="eyebrow">
                    {selectedProfessional.title}
                  </p>

                  <h2
                    id={`profile-title-${selectedProfessional.id}`}
                  >
                    {selectedProfessional.name}
                  </h2>

                  {selectedProfessional.businessName ? (
                    <h3>
                      {selectedProfessional.businessName}
                    </h3>
                  ) : null}

                  <div
                    className="profile-dialog__bio"
                    id={`profile-bio-${selectedProfessional.id}`}
                  >
                    {selectedProfessional.bio.map(
                      (paragraph, index) => (
                        <p
                          key={`${selectedProfessional.id}-${index}`}
                        >
                          {paragraph}
                        </p>
                      ),
                    )}
                  </div>

                  {selectedProfessional.bookingUrl ||
                  selectedProfessional.phone ||
                  selectedProfessional.email ? (
                    <div
                      className="profile-dialog__actions"
                      aria-label={`${selectedProfessional.name} contact options`}
                    >
                      {selectedProfessional.bookingUrl ? (
                        <a
                          className="button button--dark"
                          href={selectedProfessional.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Book now
                          <ArrowUpRight aria-hidden="true" />
                        </a>
                      ) : null}

                      {selectedProfessional.phone ? (
                        <a
                          className="button button--dark"
                          href={`tel:+1${selectedProfessional.phone.replace(
                            /\D/g,
                            '',
                          )}`}
                        >
                          <Phone aria-hidden="true" />
                          {selectedProfessional.phone}
                        </a>
                      ) : null}

                      {selectedProfessional.email ? (
                        <a
                          className="profile-dialog__contact-link"
                          href={`mailto:${selectedProfessional.email}`}
                        >
                          <Mail aria-hidden="true" />
                          {selectedProfessional.email}
                        </a>
                      ) : null}
                    </div>
                  ) : null}

                  {selectedProfessional.websiteUrl ||
                  selectedProfessional.socialLinks?.length ? (
                    <div className="profile-dialog__external-links">
                      {selectedProfessional.websiteUrl ? (
                        <a
                          href={selectedProfessional.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit website
                          <ExternalLink aria-hidden="true" />
                        </a>
                      ) : null}

                      {selectedProfessional.socialLinks?.map(
                        (link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                            <ExternalLink aria-hidden="true" />
                          </a>
                        ),
                      )}
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