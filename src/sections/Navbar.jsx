import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePageTransition } from "../components/PageTransition"
import { asset } from "../utils/asset"

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

// Custom hook to track active section
const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => link.href.replace('#', ''))
      const scrollPosition = window.scrollY + 100 // Offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return activeSection
}

const NavItems = ({ onClick, onNavigate, activeSection }) => {
  return (
    <ul className="nav-ul">
      {links.map((item) => {
        const isActive = activeSection === item.href.replace('#', '')
        return (
          <li key={item.href} className="nav-li">
            <a
              onClick={(e) => {
                if (onNavigate && item.href.startsWith('#')) {
                  e.preventDefault()
                  onNavigate(item.href, e)
                }
                if (onClick) onClick()
              }}
              className={`nav-li_a ${isActive ? 'text-white' : ''}`}
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { startPageTransition } = usePageTransition()
  const [isDay, setIsDay] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('theme') === 'day'
  })
  const activeSection = useActiveSection()

  useEffect(() => {
    const body = document.body
    if (isDay) {
      body.classList.add('day-theme')
      localStorage.setItem('theme', 'day')
    } else {
      body.classList.remove('day-theme')
      localStorage.setItem('theme', 'night')
    }
  }, [isDay])

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", onEsc)
    return () => document.removeEventListener("keydown", onEsc)
  }, [])

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="navbar-glass" style={{ height: 64 }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4 mx-auto c-space">
          <a href="#home" className="text-neutral-300 font-bold text-xl hover:text-white transition-colors">
            Anam<span className="text-white">.</span>
          </a>

          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => setIsDay((v) => !v)}
              className="text-neutral-300 hover:text-white focus:outline-none rounded-md border border-black-300 px-3 py-1.5 bg-black-300"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDay ? 'Day' : 'Night'}
            </button>
            <nav className="sm:flex hidden">
              <NavItems onNavigate={startPageTransition} activeSection={activeSection} />
            </nav>
          </div>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex items-center justify-center w-10 h-10 rounded-md border border-black-300 bg-black-300"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            title="Menu"
          >
            <img src={asset('assets/menu.svg')} alt="Menu" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="nav-sidebar top-[64px]"
            id="mobile-menu"
          >
            <div className="c-space pb-4">
              <div className="flex justify-end pb-2">
                <button
                  onClick={() => setIsDay((v) => !v)}
                  className="text-neutral-300 hover:text-white focus:outline-none rounded-md border border-black-300 px-3 py-1.5 bg-black-300"
                  aria-label="Toggle theme"
                >
                  {isDay ? 'Day' : 'Night'}
                </button>
              </div>
              <NavItems onClick={closeMenu} onNavigate={startPageTransition} activeSection={activeSection} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar