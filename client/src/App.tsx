import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Directory } from './pages/Directory'
import { Faqs } from './pages/Faqs'
import { Gallery } from './pages/Gallery'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { SalonEtiquette } from './pages/SalonEtiquette'
import { Suites } from './pages/Suites'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Homepage */}
        <Route index element={<Home />} />

        {/* Main pages */}
        <Route path="suites" element={<Suites />} />
        <Route path="directory" element={<Directory />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<About />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="contact" element={<Contact />} />

        {/* Legal / secondary pages */}
        <Route
          path="privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="salon-etiquette"
          element={<SalonEtiquette />}
        />

        {/* Backwards-compatible old URLs */}
        <Route
          path="privacypolicy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="salonetiquette"
          element={<SalonEtiquette />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}