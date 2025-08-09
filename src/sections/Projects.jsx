import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Project1-Chess',
    desc: 'Chess game using raylib and C++ (learning project).',
    image: 'assets/project-logo1.png',
    link: 'https://github.com/Anam-Neupane/Project1-Chess',
  },
  {
    title: 'AI_Lab',
    desc: 'University AI course assignments and projects in Python.',
    image: 'assets/project-logo2.png',
    link: 'https://github.com/Anam-Neupane/AI_Lab',
  },
  {
    title: 'Biruwaa',
    desc: 'Hult prize project; exploring JS app structure.',
    image: 'assets/project-logo3.png',
    link: 'https://github.com/Anam-Neupane/Biruwaa',
  },
]

const Projects = () => {
  return (
    <section className="anime-gradient rounded-2xl border border-black-300 p-4 sm:p-6 section-container">
      <h2 className="head-text">Featured Projects</h2>
      <p className="text-white-600 mt-2">More on GitHub and LinkedIn. Images may be placeholders.</p>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-8">
        {projects.map((p, idx) => (
          <motion.a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-black-300 bg-black-200 overflow-hidden group ease-smooth hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(168,85,247,0.25),_0_0_24px_rgba(168,85,247,0.12)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <div className="h-40 bg-black-300 relative overflow-hidden">
              <img src="/assets/beautiful-anime-sakura-cityscape-cartoon-scene.jpg" alt="anime bg" className="section-overlay" />
              <div className="w-full h-full flex items-center justify-center ease-smooth group-hover:scale-[1.02]">
                <img src={`/${p.image}`} alt={p.title} className={`object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] ${p.title === 'Project1-Chess' ? 'w-28 h-28 sm:w-32 sm:h-32' : 'w-24 h-24'}`} />
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-white text-lg font-semibold">{p.title}</h3>
              <p className="text-white-600 mt-1">{p.desc}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

export default Projects


