import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already seen the modal
    const hasSeenModal = localStorage.getItem('pd_welcome_modal_seen')
    if (!hasSeenModal) {
      // Small delay to ensure smooth page load
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('pd_welcome_modal_seen', 'true')
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999] p-4 sm:p-8 backdrop-blur-sm animate-[fadeIn_0.3s_ease] overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="bg-gradient-to-br from-white to-slate-50 rounded-2xl sm:rounded-3xl max-w-2xl w-full relative shadow-2xl border-2 border-white/20 animate-[slideUp_0.4s_cubic-bezier(0.4,0,0.2,1)] overflow-hidden my-auto max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-700 via-primary-500 via-primary-400 to-sky-300" />
        <button
          className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 border-2 border-primary-200 w-9 h-9 sm:w-10 sm:h-10 rounded-full text-lg sm:text-2xl cursor-pointer text-slate-800 flex items-center justify-center transition-all duration-300 z-10 shadow-md hover:bg-white hover:border-primary-500 hover:rotate-90 hover:shadow-lg font-light leading-none"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="p-6 sm:p-8 md:p-12 text-center flex-1 overflow-y-auto">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 drop-shadow-md animate-[bounce_2s_ease-in-out_infinite]">
            🚗✨
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 m-0 mb-4 sm:mb-6 leading-tight bg-gradient-to-br from-primary-700 to-primary-500 bg-clip-text text-transparent">
            Thank You for Your Interest!
          </h2>
          <p className="text-base sm:text-lg md:text-lg text-slate-700 leading-relaxed m-0 mb-4 sm:mb-5 font-medium">
            We're excited to announce that <strong className="text-slate-800 font-bold">Piedmont Detailers</strong> is currently in the planning stages and will be opening in <strong className="text-slate-800 font-bold">September 2026</strong>.
          </p>
          <p className="text-sm sm:text-base md:text-base text-slate-500 leading-relaxed m-0 mb-4 sm:mb-5">
            We're building something special to bring premium mobile car detailing services to the Piedmont Triad. While we're not quite ready to take bookings yet, we'd love to hear from you!
          </p>
          <p className="text-base sm:text-lg md:text-lg text-slate-700 font-semibold my-4 sm:my-6 px-4 py-4 sm:px-5 sm:py-5 bg-gradient-to-br from-primary-500/10 to-primary-400/10 rounded-xl sm:rounded-2xl border-2 border-primary-200">
            Contact us to show your interest, ask questions, or be notified when we officially launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
            <Link
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl w-full sm:w-auto"
              to="/contact"
              onClick={handleClose}
            >
              Contact Us
            </Link>
            <button
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-500/10 hover:text-primary-700 hover:border-primary-700 hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto"
              onClick={handleClose}
            >
              Explore Site
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeModal
