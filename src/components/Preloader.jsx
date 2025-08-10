import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { asset } from '../utils/asset'

const Preloader = ({ ready }) => {
  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background: '#0b0b12' }}
        >
          <div className="relative w-[220px] h-[220px] flex items-center justify-center">
            {/* Rotating ring asset */}
            <img
              src={asset('assets/ring.png')}
              alt="ring"
              className="absolute inset-0 m-auto w-[220px] h-[220px] opacity-60 animate-spin-slow"
              aria-hidden
            />
            {/* Glowing orb */}
            <motion.div
              className="rounded-full"
              initial={{ scale: 0.9, opacity: 0.9 }}
              animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.9, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              style={{
                width: 140,
                height: 140,
                background: 'radial-gradient(60% 60% at 50% 50%, rgba(168,85,247,0.75), rgba(10,10,16,1))',
                boxShadow: '0 0 30px rgba(168,85,247,0.5), inset 0 0 40px rgba(255,255,255,0.08)',
                filter: 'saturate(115%)',
              }}
            />
            {/* Orbiting dots */}
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute block w-2.5 h-2.5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #a855f7, #7dd3fc)' }}
                initial={{ rotate: i * 120 }}
                animate={{ rotate: 360 + i * 120 }}
                transition={{ repeat: Infinity, duration: 3.2 + i * 0.4, ease: 'linear' }}
              >
                <span className="block w-2.5 h-2.5 rounded-full opacity-80" />
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader


