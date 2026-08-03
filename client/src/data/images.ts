import { assetUrl } from '../utils/assetUrl'

type ImageFormat = 'avif' | 'webp'

type ImageDefinition = {
  width: number
  height: number
  widths: readonly number[]
  formats?: readonly ImageFormat[]
}

const imageVersion = 'v1'

export const images = {
  'about-banner': { width: 1442, height: 719, widths: [640, 1024, 1440] },
  'aubrey-novy': { width: 1707, height: 2560, widths: [360, 720, 1200] },
  building: { width: 925, height: 548, widths: [480, 800, 925] },
  'cindy-vanlue': { width: 362, height: 483, widths: [362] },
  'daniela-riley': { width: 362, height: 544, widths: [362] },
  'directory-banner': { width: 1442, height: 719, widths: [640, 1024, 1440] },
  hallway: { width: 473, height: 630, widths: [320, 473] },
  'hero-lobby': { width: 1442, height: 719, widths: [640, 1024, 1440] },
  'jenelle-suleyman': { width: 365, height: 401, widths: [365] },
  'lobby-portrait': { width: 1536, height: 2048, widths: [480, 768, 1200] },
  'lobby-wide': { width: 1536, height: 2048, widths: [480, 768, 1200] },
  'lobby-window': { width: 1536, height: 2048, widths: [480, 768, 1200] },
  'malina-glaum': { width: 360, height: 540, widths: [360] },
  marblebackground: { width: 3456, height: 5184, widths: [768, 1600] },
  'samantha-jacks': { width: 360, height: 476, widths: [360] },
  'service-esthetician': { width: 1800, height: 1200, widths: [480, 800, 1200] },
  'service-hair': { width: 1800, height: 1197, widths: [480, 800, 1200] },
  'service-lashes': { width: 1800, height: 1200, widths: [480, 800, 1200] },
  'service-nails': { width: 1800, height: 1202, widths: [480, 800, 1200] },
  'suites-banner': { width: 1442, height: 719, widths: [640, 1024, 1440] },
  vanity: { width: 1536, height: 2048, widths: [480, 768, 1200] },
  logo: { width: 1020, height: 200, widths: [1020], formats: ['webp'] },
} as const satisfies Record<string, ImageDefinition>

export type ImageKey = keyof typeof images

export function getImageUrl(image: ImageKey, format: ImageFormat = 'webp', requestedWidth?: number) {
  const definition = images[image]
  const width = requestedWidth ?? definition.widths[definition.widths.length - 1]
  const filename = image === 'logo' ? 'diamondsuitescrystalriverlogo' : image
  return assetUrl(`images/optimized/${imageVersion}/${filename}-${width}.${format}`)
}

export function getImageSrcSet(image: ImageKey, format: ImageFormat) {
  return images[image].widths.map((width) => `${getImageUrl(image, format, width)} ${width}w`).join(', ')
}

export function getImageFormats(image: ImageKey): readonly ImageFormat[] {
  return image === 'logo' ? ['webp'] : ['avif', 'webp']
}
