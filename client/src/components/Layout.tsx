import type { CSSProperties } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToTop } from './ScrollToTop'
import { useScrollReveal } from './useScrollReveal'
import { getImageUrl } from '../data/images'

export function Layout() {
  const location = useLocation()

  useScrollReveal(location.pathname)

  const pageAssetStyles = {
    '--marble-surface-background-fallback': `url("${getImageUrl('marblebackground', 'webp', 1600)}")`,
    '--marble-surface-background': `image-set(url("${getImageUrl('marblebackground', 'avif', 1600)}") type("image/avif"), url("${getImageUrl('marblebackground', 'webp', 1600)}") type("image/webp"))`,
    '--marble-surface-background-small-fallback': `url("${getImageUrl('marblebackground', 'webp', 768)}")`,
    '--marble-surface-background-small': `image-set(url("${getImageUrl('marblebackground', 'avif', 768)}") type("image/avif"), url("${getImageUrl('marblebackground', 'webp', 768)}") type("image/webp"))`,
  } as CSSProperties

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="page-transition" key={location.pathname} style={pageAssetStyles}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
