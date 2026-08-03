import type { ImageKey } from '../data/images'
import { ResponsiveImage } from './ResponsiveImage'

type PageHeroProps = {
  eyebrow?: string
  title: string
  image: ImageKey
  description?: string
}

export function PageHero({
  eyebrow,
  title,
  image,
  description,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <ResponsiveImage
        image={image}
        alt=""
        sizes="100vw"
        priority
        pictureClassName="page-hero__media"
        objectFit="cover"
      />
      <div className="page-hero__content container" data-reveal>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

        <h1>{title}</h1>

        {description ? <p>{description}</p> : null}
      </div>
    </section>
  )
}
