import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Root.jsx'
import './index.css'
import { asset } from './utils/asset'

// Always start at top/home on reload
window.history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

// Warm cache for key images without blocking initial paint
const preloadImages = async () => {
  const sources = [
    asset('assets/anime-style-mythical-dragon-creature.jpg'), // Experience bg
    asset('assets/anime-character-near-galaxy-planet-illustration.jpg'), // Hero bg
    asset('assets/ring.png'),
    asset('assets/profile.jpg'),
  ]

  const cache = []
  const tasks = sources.map((src) => {
    return new Promise((resolve) => {
      const img = new Image()
      try { img.fetchPriority = 'high' } catch {}
      img.decoding = 'async'
      img.loading = 'eager'
      img.onload = () => resolve()
      img.onerror = () => resolve()
      img.src = src
      cache.push(img)
    })
  })

  // Attempt to decode to keep bitmaps ready
  await Promise.all(tasks)
  try {
    await Promise.all(cache.map((img) => img.decode?.().catch(() => {})))
  } catch {}

  // Retain references to discourage GC of decoded bitmaps
  window.__imageCache = cache
}

if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => { preloadImages() }, { timeout: 2000 })
  } else {
    setTimeout(() => { preloadImages() }, 0)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
