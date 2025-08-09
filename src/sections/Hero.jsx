import { useState } from 'react'
import { motion } from 'framer-motion'

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

  const enableOverlay = () => {
    document.body.style.setProperty(
      '--hero-overlay-image',
      "url('/assets/anime-character-near-galaxy-planet-illustration.jpg')"
    )
    document.body.classList.add('hero-overlay-active')
  }

  const disableOverlay = () => {
    document.body.style.setProperty('--hero-overlay-scale', '1')
    document.body.classList.remove('hero-overlay-active')
  }

  return (
    <div className="anime-gradient rounded-2xl border border-black-300 relative overflow-hidden gpu">
      <div className="relative z-10 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center px-4 sm:px-6 md:px-8 content-auto">
        <div className="max-w-xl pr-2 sm:pr-4 md:pr-6">
          <motion.h1 variants={container} initial="hidden" animate="show" className="hero_tag text-white whitespace-nowrap">
            {title.split('').map((ch, idx) => (
              <motion.span key={idx} variants={child} className={`inline-block ${ch === ' ' ? 'mr-2' : ''}`}>
                {ch}
              </motion.span>
            ))}
          </motion.h1>
          <p className="mt-6 text-white-600 text-lg max-w-xl">
          Sophomore Computer Science Student | 
          <br></br>Exploring AI & Machine Learning
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a href="#projects" className="btn">
              <span>View Projects</span>
              <img src="/assets/right-arrow.png" alt="arrow" className="w-4 h-4" />
            </a>
            <a href="#experience" className="btn bg-black-500">
              <span>Experience</span>
            </a>
            <a href="https://github.com/Anam-Neupane" target="_blank" rel="noreferrer" className="btn">
              <span>GitHub</span>
            </a>
            <a href="#contact" className="btn bg-black-500">
              <span>Contact</span>
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]"
          onMouseEnter={() => { if (!overlayLocked) enableOverlay() }}
          onMouseLeave={() => { if (!overlayLocked) disableOverlay() }}
        >
          <div
            className="absolute inset-0 -z-10 cursor-pointer"
            aria-hidden
            onClick={() => {
              if (overlayLocked) {
                disableOverlay()
                setOverlayLocked(false)
              } else {
                enableOverlay()
                setOverlayLocked(true)
              }
            }}
          >
            <img src="/assets/anime-character-near-galaxy-planet-illustration.jpg" alt="background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)"}} />
          </div>
          <img src="/assets/ring.png" alt="rings" className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-56 sm:w-80 lg:w-80 opacity-35 animate-spin-slow hidden md:block" aria-hidden />
          <img src="/assets/star1.png" alt="sparkle" className="absolute top-4 left-4 w-5 sm:w-6 opacity-70 animate-float hidden sm:block" aria-hidden />

          <div className="glass-card neon-border rounded-2xl p-4 md:p-6 flex items-center gap-5 absolute left-4 right-4 bottom-4 sm:left-6 sm:right-6 sm:bottom-6">
            <img
              src="/assets/profile.jpg"
              alt="Anam Neupane"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl object-cover border border-black-300"
            />
            <div>
              <h3 className="text-white text-2xl font-semibold">Anam Neupane</h3>
              <p className="text-white-600">Data Scientist • Python • ML • Statistics • Visualization</p>
              <div className="mt-3 flex gap-3">
                <a className="social-icon" href="https://github.com/Anam-Neupane" target="_blank" rel="noreferrer">
                  <img src="/assets/github.svg" alt="GitHub" className="w-5 h-5 lg:w-7 lg:h-10" />
                </a>
                <a className="social-icon" href="https://www.linkedin.com/in/anam-neupane/" target="_blank" rel="noreferrer">
                  <img src="/assets/linkedin.svg" alt="LinkedIn" className="w-5 h-5 invert" />
                </a>
                <a className="social-icon" href="mailto:anamn037@gmail.com" target="_blank" rel="noreferrer">
                  <img src="/assets/gmail.svg" alt="Gmail" className="w-5 h-5 " />
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


