import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

/*
 * GitHub Pages hosts this project under:
 *
 * /diamondsuitescrystalriver/
 *
 * Vite exposes that configured deployment path through BASE_URL.
 * Remove the trailing slash for React Router's basename.
 */
const basename =
  import.meta.env.BASE_URL === '/'
    ? '/'
    : import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

/* =========================================================
   SERVICE WORKER
   ========================================================= */

if (
  import.meta.env.PROD &&
  'serviceWorker' in navigator
) {
  window.addEventListener('load', () => {
    const serviceWorkerUrl = `${import.meta.env.BASE_URL}sw.js`

    navigator.serviceWorker
      .register(serviceWorkerUrl)
      .catch((error) => {
        console.error(
          'Service worker registration failed:',
          error,
        )
      })
  })
}