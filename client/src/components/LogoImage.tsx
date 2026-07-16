import { useState } from 'react'

type LogoImageProps = {
  className?: string
  alt?: string
}

const logoSources = [
  '/images/DiamondSuitesCrystalRiverLogo.gif',
  '/images/DiamondSuitesCrystalRiverLogo.webp',
]

export function LogoImage({ className, alt = 'Diamond Suites Crystal River' }: LogoImageProps) {
  const [sourceIndex, setSourceIndex] = useState(0)
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
    <img
      className={className}
      src={logoSources[sourceIndex]}
      alt={alt}
      onError={() => {
        if (sourceIndex < logoSources.length - 1) {
          setSourceIndex((current) => current + 1)
        } else {
          setFailed(true)
        }
      }}
    />
  )
}
