import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const Root = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root container #root not found')
}

// If prerendered HTML exists, hydrate; otherwise do a normal client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, Root)
} else {
  createRoot(container).render(Root)
}

