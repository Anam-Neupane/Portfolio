import { motion } from 'framer-motion'

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
  return (
    <section className="rounded-2xl border border-black-300 p-0 sm:p-0 relative overflow-hidden red-theme">
      {/* WOW background with anime dragon and parallax layers */}
      <div className="absolute inset-0">
        <img 
          src="/assets/anime-style-mythical-dragon-creature.jpg" 
          alt="anime dragon" 
          className="w-full h-full object-cover opacity-60" 
          loading="eager"
          decoding="async"
          fetchpriority="high"
          style={{ willChange: 'auto', transform: 'translateZ(0)', transition: 'none' }}
        />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(60% 60% at 50% 20%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.55) 100%)'
        }} />
      </div>
      <div className="relative p-4 sm:p-6 anime-gradient-red">
      <h2 className="head-text">Experience</h2>

      {/* Timeline */}
      <div className="relative mt-10">
        {/* Line */}
        <motion.span
          aria-hidden
          className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-400/40 via-red-500/40 to-red-400/30"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'top' }}
        />

        <div className="space-y-6">
          {experiences.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative grid sm:grid-cols-[1fr_1fr] gap-4 sm:gap-8 items-start"
            >
              {/* Node */}
              <div className="sm:col-start-1 sm:col-end-2">
                <div className="flex sm:justify-end">
                  <div className="relative">
                    <span className="absolute -left-1.5 top-2.5 sm:left-auto sm:-right-1.5 w-3 h-3 rounded-full bg-red-400 shadow-[0_0_0_3px_rgba(127,29,29,0.4)]" />
                    <div className="glass-card neon-border rounded-xl p-4 sm:p-5 max-w-xl backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <img src="/assets/star.png" alt="logo" className="w-6 h-6 opacity-80" />
                        <h4 className="text-white text-lg font-semibold">{item.role}</h4>
                      </div>
                      <p className="text-white-600 mt-1">@ {item.company} · {item.period}</p>
                      <p className="text-white-700 mt-3">{item.summary}</p>
                      {item.url && (
                        <a className="text-white hover:underline mt-3 inline-block" href={item.url} target="_blank" rel="noreferrer">
                          View repository →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout on larger screens */}
              <div className="hidden sm:block" />
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

export default Experience

