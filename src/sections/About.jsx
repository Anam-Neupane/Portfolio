import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
      className="grid lg:grid-cols-[1.2fr_1fr] md:grid-cols-2 gap-6 anime-gradient rounded-2xl border border-black-300 p-4 sm:p-6 will-change-auto"
    >
      <div className="grid-container">
        <h3 className="grid-headtext">About</h3>
        <p className="grid-subtext">
          Data science enthusiast from Bhaktapur, Nepal. Interested in statistical modeling, machine learning,
          data visualization, and turning datasets into insights. Comfortable with Python tooling for data work
          (NumPy, pandas, scikit-learn, Matplotlib/Seaborn) and Jupyter workflows. Side skills include React and
          frontend for building interactive dashboards.
        </p>
        <div className="mt-4 flex gap-3">
          <a href="/assets/Anam-Neupane_CV.pdf" download className="btn bg-black-500">
            <span>Download CV</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
              <path d="M12 3a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 12.586V4a1 1 0 0 1 1-1z"></path>
              <path d="M5 20a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2H5z"></path>
            </svg>
          </a>
          <a href="#contact" className="btn">
            <span>Hire Me</span>
          </a>
        </div>
      </div>
      <div className="grid-container">
        <h3 className="grid-headtext">Skills</h3>
        <p className="grid-subtext">
          Core: Python, pandas, NumPy, scikit-learn, Matplotlib/Seaborn, Jupyter, Git.
          Side: C/C++, React, JavaScript/TypeScript, Tailwind CSS, Framer Motion, Linux basics.
        </p>
      </div>
      <div className="md:col-span-2 lg:col-span-1 hidden md:block">

      </div>
    </motion.section>
  )
}

export default About


