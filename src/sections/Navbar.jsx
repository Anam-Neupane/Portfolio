import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

const NavItems = ({ onClick }) => {
  return (
    <ul className="nav-ul">
      {links.map((item) => (
        <li key={item.href} className="nav-li">
          <a onClick={onClick} className="nav-li_a" href={item.href}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef(null)

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
    <header className="navbar-glass">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4 mx-auto c-space">
          <a href="#home" className="text-neutral-300 font-bold text-xl hover:text-white transition-colors">
            Anam<span className="text-white">.</span>
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"} alt="toggle" className="w-6 h-6" />
          </button>

          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={sidebarRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="nav-sidebar"
          >
            <div className="c-space pb-4">
              <NavItems onClick={closeMenu} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar