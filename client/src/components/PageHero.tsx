import { assetUrl } from '../utils/assetUrl'

type PageHeroProps = {
  eyebrow?: string
  title: string
  image: string
  description?: string
}

export function PageHero({
  eyebrow,
  title,
  image,
  description,
}: PageHeroProps) {
  const backgroundImage = assetUrl(image)

  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      <div className="page-hero__content container" data-reveal>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

        <h1>{title}</h1>

        {description ? <p>{description}</p> : null}
      </div>
    </section>
  )
}
