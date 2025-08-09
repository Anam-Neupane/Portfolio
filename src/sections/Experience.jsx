import { motion } from 'framer-motion'
import { useState } from 'react'

const experiences = [
  {
    company: 'Data Science Learning',
    role: 'Python + ML Practice',
    period: '2023 — Present',
    summary:
      'Hands-on notebooks exploring data cleaning, EDA, feature engineering, classical ML models, and evaluation.',
  },
  {
    company: 'AI_Lab (University)',
    role: 'AI Coursework (Python)',
    period: '2023 — 2024',
    summary:
      'Algorithms and assignments covering search, basic ML, and problem solving in Python.',
    url: 'https://github.com/Anam-Neupane/AI_Lab',
  },
]

const Experience = () => {
  const [hoverOverlay, setHoverOverlay] = useState(false)

  return (
    <section className="red-theme anime-gradient-red rounded-2xl border border-black-300 p-4 sm:p-6 relative overflow-hidden">
      {/* Hover overlay that covers the whole frame */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hoverOverlay ? 0.22 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          backgroundImage: "url('/assets/anime-style-mythical-dragon-creature.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(20%)',
        }}
      />
      <h2 className="head-text">Experience</h2>
      <div className="work-container relative z-10 content-auto">
        <div
          className="work-canvas hidden lg:block relative overflow-hidden rounded-lg"
          onMouseEnter={() => setHoverOverlay(true)}
          onMouseLeave={() => setHoverOverlay(false)}
        >
          <img src="/assets/anime-style-mythical-dragon-creature.jpg" alt="anime dragon" className="w-full h-full object-cover opacity-70" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)", opacity: hoverOverlay ? 0.33 : 0.25, transition: 'opacity 450ms cubic-bezier(0.22,1,0.36,1)' }}
          />
        </div>
        <div className="work-content p-4 sm:p-6">
          {experiences.map((item, idx) => (
            <motion.div
              key={idx}
              className="work-content_container group p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="work-content_logo flex items-center justify-center">
                <img src="/assets/star.png" alt="logo" className="w-8 h-8" />
              </div>
              <div className="py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-white text-xl font-semibold">{item.role}</h4>
                  <span className="text-white-500">@ {item.company}</span>
                </div>
                <p className="text-white-600 text-sm mt-1">{item.period}</p>
                <p className="text-white-700 mt-3">{item.summary}</p>
                {item.url && (
                  <a className="text-white hover:underline mt-2 inline-block" href={item.url} target="_blank" rel="noreferrer">
                    View repository →
                  </a>
                )}
              </div>
              <span className="work-content_bar" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience


