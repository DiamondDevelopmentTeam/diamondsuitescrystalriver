import { useState } from 'react'
import { ResponsiveImage } from './ResponsiveImage'

type LogoImageProps = {
  className?: string
  alt?: string
}

export function LogoImage({
  className,
  alt = 'Diamond Suites Crystal River',
}: LogoImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={`logo-fallback ${className ?? ''}`} aria-label={alt}>
        <span aria-hidden="true">◆</span>

        <span>
          DIAMOND SUITES
          <small>CRYSTAL RIVER</small>
        </span>
      </span>
    )
  }

  return (
    <ResponsiveImage
      image="logo"
      className={className}
      alt={alt}
      sizes="(max-width: 640px) 245px, 330px"
      loading="eager"
      objectFit="contain"
      objectPosition="left center"
      preserveAspectRatio
      onError={() => setFailed(true)}
    />
  )
}
