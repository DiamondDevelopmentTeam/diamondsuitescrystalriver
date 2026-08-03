import type { CSSProperties, ImgHTMLAttributes } from 'react'
import { getImageFormats, getImageSrcSet, getImageUrl, images, type ImageKey } from '../data/images'

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'height' | 'src' | 'srcSet' | 'width'> & {
  image: ImageKey
  alt: string
  sizes: string
  priority?: boolean
  pictureClassName?: string
  aspectRatio?: CSSProperties['aspectRatio']
  objectFit?: CSSProperties['objectFit']
  objectPosition?: CSSProperties['objectPosition']
  preserveAspectRatio?: boolean
}

export function ResponsiveImage({
  image,
  alt,
  sizes,
  priority = false,
  pictureClassName,
  aspectRatio,
  objectFit,
  objectPosition,
  preserveAspectRatio = false,
  className,
  loading,
  fetchPriority,
  decoding,
  style,
  ...imageProps
}: ResponsiveImageProps) {
  const definition = images[image]
  const formats = getImageFormats(image)
  const webpSrcSet = getImageSrcSet(image, 'webp')

  return (
    <picture className={`responsive-picture${pictureClassName ? ` ${pictureClassName}` : ''}`}>
      {formats.includes('avif') ? <source type="image/avif" srcSet={getImageSrcSet(image, 'avif')} sizes={sizes} /> : null}
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        {...imageProps}
        className={className}
        src={getImageUrl(image)}
        srcSet={webpSrcSet}
        sizes={sizes}
        width={definition.width}
        height={definition.height}
        alt={alt}
        loading={priority ? 'eager' : (loading ?? 'lazy')}
        fetchPriority={priority ? 'high' : (fetchPriority ?? 'auto')}
        decoding={decoding ?? 'async'}
        style={{
          aspectRatio,
          objectFit,
          objectPosition,
          ...style,
          ...(preserveAspectRatio ? { aspectRatio: 'auto', height: 'auto' } : null),
        }}
      />
    </picture>
  )
}
