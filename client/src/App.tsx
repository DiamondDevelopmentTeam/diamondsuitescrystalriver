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
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="suites" element={<Suites />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="directory" element={<Directory />} />
        <Route path="professionals" element={<Directory />} />
        <Route path="contact" element={<Contact />} />
        <Route path="salon-etiquette" element={<SalonEtiquette />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
