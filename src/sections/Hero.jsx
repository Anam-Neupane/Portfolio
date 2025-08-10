import { useEffect, useRef, useState } from 'react'
import { usePageTransition } from '../components/PageTransition'
import { motion } from 'framer-motion'
import { asset } from '../utils/asset'

const title = "Hi, I'm Anam Neupane"

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
}

const child = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.5 } },
}

const Hero = () => {
  const [overlayLocked, setOverlayLocked] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const { startPageTransition } = usePageTransition()
  const rafRef = useRef(0)

  const enableOverlay = () => {
    // Add smooth transition for overlay activation
    document.body.style.setProperty(
      '--hero-overlay-image',
      `url('${asset('assets/anime-character-near-galaxy-planet-illustration.jpg')}')`
    )
    document.body.classList.add('hero-overlay-active')
    
    // Ensure smooth transition by adding a brief delay
    requestAnimationFrame(() => {
      document.body.style.setProperty('--hero-overlay-opacity', '0.14')
    })
  }

  const disableOverlay = () => {
    // Smooth transition for overlay deactivation
    document.body.style.setProperty('--hero-overlay-opacity', '0')
    
    // Remove class after transition completes
    setTimeout(() => {
      document.body.classList.remove('hero-overlay-active')
      document.body.style.removeProperty('--hero-overlay-image')
      document.body.style.removeProperty('--hero-overlay-opacity')
    }, 300)
  }

  // Update overlay background position on scroll to move towards the bottom (foot of image)
  useEffect(() => {
    const updateOverlayY = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop || window.pageYOffset
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight)
      const ratio = Math.min(1, scrollTop / max)
      const y = 50 + ratio * 35 // from 50% to ~85%
      document.body.style.setProperty('--hero-overlay-y', `${y}%`)
      rafRef.current = 0
    }
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(updateOverlayY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // initialize
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [])

  // Show small double-click hint for a moment
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="anime-gradient rounded-2xl border border-black-300 relative overflow-hidden">
      <div
        className="relative z-10 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center px-4 sm:px-6 md:px-8"
        onDoubleClick={() => {
          if (overlayLocked) {
            disableOverlay()
            setOverlayLocked(false)
          } else {
            enableOverlay()
            setOverlayLocked(true)
          }
        }}
      >
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="absolute top-3 right-3 z-20 bg-black-300/75 backdrop-blur-sm rounded-md px-3 py-1.5 text-xs text-white-600"
          >
            Double-click hero to set background
          </motion.div>
        )}
        <div className="relative max-w-none pr-8 sm:pr-12 md:pr-20 lg:pr-28 -mr-6 sm:-mr-12 md:-mr-16 z-20 overflow-visible">
          <motion.h1 variants={container} initial="hidden" animate="show" className="hero_tag text-white whitespace-nowrap">
            {title.split('').map((ch, idx) => (
              <motion.span key={idx} variants={child} className={`inline-block ${ch === ' ' ? 'mr-2' : ''}`}>
                {ch}
              </motion.span>
            ))}
          </motion.h1>
          <p className="mt-6 text-white-600 text-lg max-w-xl">
          Sophomore Computer Science Student |<br></br> Exploring AI & Machine Learning
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="btn"
              onClick={(e) => {
                e.preventDefault()
                startPageTransition('#projects', e)
              }}
            >
              <span>View Projects</span>
              <img src={asset('assets/right-arrow.png')} alt="arrow" className="w-4 h-4" />
            </a>
            <a
              href="#experience"
              className="btn bg-black-500"
              onClick={(e) => {
                e.preventDefault()
                startPageTransition('#experience', e)
              }}
            >
              <span>Experience</span>
            </a>
            <a href="https://github.com/Anam-Neupane" target="_blank" rel="noreferrer" className="btn">
              <span>GitHub</span>
            </a>
            <a
              href="#contact"
              className="btn bg-black-500"
              onClick={(e) => {
                e.preventDefault()
                startPageTransition('#contact', e)
              }}
            >
              <span>Contact</span>
            </a>
          </div>
        </div>

        <motion.div
           initial={{ opacity: 1, y: 0 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]"
          onMouseEnter={() => { if (!overlayLocked) enableOverlay() }}
          onMouseLeave={() => { if (!overlayLocked) disableOverlay() }}
        >
          <div
            className="absolute inset-0 -z-10 cursor-pointer"
            aria-hidden
            // background container intentionally has no double-click; handled on parent grid
          >
            <img src={asset('assets/anime-character-near-galaxy-planet-illustration.jpg')} alt="background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)"}} />
          </div>
          <img src={asset('assets/ring.png')} alt="rings" className="absolute -top-0 -right-0 sm:-top-0 sm:-right-10 w-56 sm:w-80 lg:w-80 opacity-35 animate-spin-slow hidden md:block" aria-hidden />
          <img src={asset('assets/star1.png')} alt="sparkle" className="absolute top-4 left-4 w-8 sm:w-10 opacity-70 animate-float hidden sm:block" aria-hidden />

          <div className="glass-card neon-border rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row sm:flex-nowrap items-start sm:items-center gap-5 absolute left-4 right-4 bottom-4 sm:left-6 sm:right-6 sm:bottom-6">
            <img
              src={asset('assets/profile.jpg')}
              alt="Anam Neupane"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl object-cover border border-black-300"
            />
            <div className="min-w-0 w-full sm:flex-1">
              <h3 className="text-white text-2xl font-semibold">Anam Neupane</h3>
              <p className="text-white-600 break-words text-sm sm:text-base">Data Scientist • Python • ML • Statistics • Visualization</p>
              <div className="mt-3 flex gap-3">
                <a className="social-icon" href="https://github.com/Anam-Neupane" target="_blank" rel="noreferrer">
                  <img src={asset('assets/github.svg')} alt="GitHub" className="w-5 h-5 lg:w-7 lg:h-10" />
                </a>
                <a className="social-icon" href="https://www.linkedin.com/in/anam-neupane/" target="_blank" rel="noreferrer">
                  <img src={asset('assets/linkedin.svg')} alt="LinkedIn" className="w-5 h-5 invert" />
                </a>
                <a className="social-icon" href="mailto:anamn037@gmail.com" target="_blank" rel="noreferrer">
                  <img src={asset('assets/gmail.svg')} alt="Gmail" className="w-5 h-5 " />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero


