import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToTop } from './ScrollToTop'
import { useScrollReveal } from './useScrollReveal'

export function Layout() {
  const location = useLocation()

  useScrollReveal(location.pathname)

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="page-transition" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
