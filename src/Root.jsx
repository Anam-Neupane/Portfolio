import React, { useEffect, useMemo, useState } from 'react'
import App from './App'
import Preloader from './components/Preloader'
import { PageTransitionProvider } from './components/PageTransition'

const preloadImages = (srcList) =>
  Promise.all(
    srcList.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image()
          img.onload = img.onerror = () => resolve(true)
          img.src = src
        })
    )
  )

const Root = () => {
  const [ready, setReady] = useState(false)

  const assets = useMemo(
    () => [
      '/assets/anime-character-near-galaxy-planet-illustration.jpg',
      '/assets/anime-style-mythical-dragon-creature.jpg',
      '/assets/profile.jpg',
      '/assets/ring.png',
      '/assets/star1.png',
    ],
    []
  )

  useEffect(() => {
    let mounted = true
    // Race window load, image preload, and a minimal delay so preloader is visible briefly
    const onWindowLoad = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve(true)
      else window.addEventListener('load', () => resolve(true), { once: true })
    })

    const onImages = preloadImages(assets)
    const minDelay = new Promise((r) => setTimeout(r, 500))

    Promise.race([Promise.all([onWindowLoad, onImages, minDelay])]).then(() => {
      if (mounted) setReady(true)
    })

    return () => {
      mounted = false
    }
  }, [assets])

  return (
    <PageTransitionProvider>
      <Preloader ready={ready} />
      <App />
    </PageTransitionProvider>
  )
}

export default Root


