import { useState } from 'react'

type BrandAssetProps = {
  src: string
  alt: string
  className?: string
  fallbackClassName?: string
  fallbackTitle: string
  fallbackSubtitle: string
}

export function BrandAsset({ src, alt, className, fallbackClassName, fallbackTitle, fallbackSubtitle }: BrandAssetProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={`partner-logo ${fallbackClassName ?? ''}`} aria-label={alt}>
        <span aria-hidden="true">◆</span>
        <strong>{fallbackTitle}</strong>
        <small>{fallbackSubtitle}</small>
      </span>
    )
  }

  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />
}
