type PageHeroProps = {
  eyebrow?: string
  title: string
  image: string
  description?: string
}

export function PageHero({ eyebrow, title, image, description }: PageHeroProps) {
  return (
    <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.72), rgba(0,0,0,.2)), url(${image})` }}>
      <div className="page-hero__content container reveal-up">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
    </section>
  )
}
