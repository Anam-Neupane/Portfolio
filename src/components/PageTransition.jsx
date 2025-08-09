import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'

const PageTransitionContext = createContext({ startPageTransition: () => {} })

export const usePageTransition = () => useContext(PageTransitionContext)

export const PageTransitionProvider = ({ children }) => {
  const scrollTimeoutRef = useRef(null)
  const finishTimeoutRef = useRef(null)
  const isTransitioningRef = useRef(false)
  const originalScrollBehavior = useRef('auto')

  const clearTimers = () => {
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = null
    }
    if (finishTimeoutRef.current) {
      window.clearTimeout(finishTimeoutRef.current)
      finishTimeoutRef.current = null
    }
    isTransitioningRef.current = false
  }

  useEffect(() => {
    originalScrollBehavior.current = document.documentElement.style.scrollBehavior || 'auto'
    return () => clearTimers()
  }, [])

  const startPageTransition = useCallback((selector, event) => {
    if (isTransitioningRef.current) return
    clearTimers()

    // Start transition without locking or pausing page animations
    isTransitioningRef.current = true

    // Helper: compute navbar offset dynamically
    const getNavOffset = () => {
      const header = document.querySelector('header.navbar-glass')
      const h = header?.getBoundingClientRect().height
      return Math.max(0, Math.round(h ?? 64))
    }

    // Start scroll almost immediately
    scrollTimeoutRef.current = window.setTimeout(() => {
      const performScroll = () => {
        // If hero overlay is active, ensure app stays above it
        const rootEl = document.getElementById('root')
        if (document.body.classList.contains('hero-overlay-active') && rootEl) {
          rootEl.style.zIndex = '1'
          // Preserve overlay position during navigation
          const currentOverlayY = getComputedStyle(document.body).getPropertyValue('--hero-overlay-y') || '50%'
          document.body.style.setProperty('--hero-overlay-y', currentOverlayY)
        }
        
        const el = typeof selector === 'string' ? document.querySelector(selector) : null
        if (!el) return

        // Use native smooth scroll for this specific action
        document.documentElement.style.scrollBehavior = 'smooth'

        const rect = el.getBoundingClientRect()
        const currentY = window.pageYOffset
        const navOffset = getNavOffset()
        let targetY

        if (selector === '#contact') {
          const baseCenter = currentY + rect.top + rect.height / 2 - window.innerHeight / 2
          targetY = baseCenter - navOffset / 2
        } else {
          targetY = currentY + rect.top - navOffset
        }

        const doc = document.documentElement
        const maxY = doc.scrollHeight - window.innerHeight
        targetY = Math.max(0, Math.min(Math.round(targetY), maxY))

        window.scrollTo({ top: targetY, behavior: 'smooth' })

        // Restore original scroll behavior after a short delay
        finishTimeoutRef.current = window.setTimeout(() => {
          document.documentElement.style.scrollBehavior = originalScrollBehavior.current
        }, 600) // Give enough time for native smooth scroll to complete
      }
      // ensure overlay frame, then scroll next frame
      requestAnimationFrame(performScroll)
    }, 10)

    // Finish transition
    finishTimeoutRef.current = window.setTimeout(() => {
      isTransitioningRef.current = false
    }, 600)
  }, [])

  const contextValue = useMemo(() => ({ startPageTransition }), [startPageTransition])

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children}
    </PageTransitionContext.Provider>
  )
}


