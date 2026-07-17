import type { CSSProperties } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToTop } from './ScrollToTop'
import { useScrollReveal } from './useScrollReveal'
import { assetUrl } from '../utils/assetUrl'

export function Layout() {
  const location = useLocation()

  useScrollReveal(location.pathname)

  const pageAssetStyles = {
    '--marble-surface-background': `url("${assetUrl('images/marblebackground.jpg')}")`,
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
