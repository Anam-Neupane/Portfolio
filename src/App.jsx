import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const App = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Navbar />
      <section id="home" className="c-space pt-28">
        <Hero />
      </section>
      <section id="about" className="c-space pt-20">
        <About />
      </section>
      <section id="experience" className="c-space pt-20">
        <Experience />
      </section>
      <section id="projects" className="c-space pt-20">
        <Projects />
      </section>
      <section id="contact" className="c-space pt-20 pb-24">
        <Contact />
      </section>
      <Footer />
    </main>
  )
}

export default App