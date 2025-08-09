const Footer = () => {
  return (
    <footer className="c-space py-10 border-t border-black-300 text-white-600">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Anam Neupane</p>
        <div className="flex items-center gap-3">
          <a className="social-icon" href="https://github.com/" target="_blank" rel="noreferrer">
            <img src="/assets/github.svg" alt="GitHub" className="w-5 h-5 " />
          </a>
          <a className="social-icon" href="https://twitter.com/" target="_blank" rel="noreferrer">
            <img src="/assets/twitter.svg" alt="Twitter" className="w-5 h-5 " />
          </a>
          <a className="social-icon" href="#contact">
            <img src="/assets/gmail.svg" alt="Contact" className="w-5 h-5 " />
          </a>
        </div>
      </div>
      <p className="max-w-7xl mx-auto mt-4 text-xs opacity-70">
        Anime background image courtesy of Freepik. See resources and licensing on Freepik.
      </p>
    </footer>
  )
}

export default Footer


