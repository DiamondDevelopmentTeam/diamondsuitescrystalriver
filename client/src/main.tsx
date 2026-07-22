import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Unable to find the root application element.')
}

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
