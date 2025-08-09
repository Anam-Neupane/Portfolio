const Footer = () => {
  return (
    <footer className="c-space py-12 border-t border-black-300 text-white-600 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-5 text-center">
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
        <p>© {new Date().getFullYear()} Anam Neupane • All rights reserved</p>
        <p className="text-xs opacity-70">Anime backgrounds via Freepik (credits within project).</p>
      </div>
      <a
        href="#home"
        className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-black-300 border border-black-200 shadow-md hover:shadow-lg transition-all active:scale-95 absolute right-4 bottom-4"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor" aria-hidden>
          <path d="M12 5l6 6h-4v6H10v-6H6l6-6z" />
        </svg>
      </a>
    </footer>
  )
}

export default Footer


