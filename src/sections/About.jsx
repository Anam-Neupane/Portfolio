import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="grid lg:grid-cols-[1.2fr_1fr] md:grid-cols-2 gap-6 anime-gradient rounded-2xl border border-black-300 p-4 sm:p-6"
    >
      <div className="grid-container">
        <h3 className="grid-headtext">About</h3>
        <p className="grid-subtext">
          Data science enthusiast from Bhaktapur, Nepal. Interested in statistical modeling, machine learning,
          data visualization, and turning datasets into insights. Comfortable with Python tooling for data work
          (NumPy, pandas, scikit-learn, Matplotlib/Seaborn) and Jupyter workflows. Side skills include React and
          frontend for building interactive dashboards.
        </p>
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


