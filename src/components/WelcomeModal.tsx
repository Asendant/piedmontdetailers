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
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999] p-8 sm:p-4 backdrop-blur-sm animate-[fadeIn_0.3s_ease]"
      onClick={handleClose}
    >
      <div
        className="bg-gradient-to-br from-white to-slate-50 rounded-3xl max-w-2xl w-full relative shadow-2xl border-2 border-white/20 animate-[slideUp_0.4s_cubic-bezier(0.4,0,0.2,1)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-700 via-primary-500 via-primary-400 to-sky-300" />
        <button
          className="absolute top-6 right-6 sm:top-4 sm:right-4 bg-white/90 border-2 border-primary-200 w-10 h-10 sm:w-9 sm:h-9 rounded-full text-2xl sm:text-lg cursor-pointer text-slate-800 flex items-center justify-center transition-all duration-300 z-10 shadow-md hover:bg-white hover:border-primary-500 hover:rotate-90 hover:shadow-lg font-light leading-none"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="p-12 sm:p-8 text-center">
          <div className="text-6xl sm:text-4xl md:text-5xl mb-6 sm:mb-4 drop-shadow-md animate-[bounce_2s_ease-in-out_infinite]">
            🚗✨
          </div>
          <h2 className="text-3xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 m-0 mb-6 sm:mb-4 leading-tight bg-gradient-to-br from-primary-700 to-primary-500 bg-clip-text text-transparent">
            Thank You for Your Interest!
          </h2>
          <p className="text-lg sm:text-base md:text-lg text-slate-700 leading-relaxed m-0 mb-5 sm:mb-4 font-medium">
            We're excited to announce that <strong className="text-slate-800 font-bold">Piedmont Detailers</strong> is currently in the planning stages and will be opening in <strong className="text-slate-800 font-bold">September 2026</strong>.
          </p>
          <p className="text-base sm:text-sm md:text-base text-slate-500 leading-relaxed m-0 mb-5 sm:mb-4">
            We're building something special to bring premium mobile car detailing services to the Piedmont Triad. While we're not quite ready to take bookings yet, we'd love to hear from you!
          </p>
          <p className="text-lg sm:text-base md:text-lg text-slate-700 font-semibold my-6 sm:my-5 px-5 py-5 sm:px-4 sm:py-4 bg-gradient-to-br from-primary-500/10 to-primary-400/10 rounded-2xl border-2 border-primary-200">
            Contact us to show your interest, ask questions, or be notified when we officially launch.
          </p>
          <div className="flex gap-4 sm:gap-3 justify-center flex-wrap mt-8 sm:mt-6">
            <Link
              className="inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-6 sm:py-3 rounded-full font-bold text-base sm:text-sm cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl min-w-[160px] sm:min-w-0 w-full sm:w-auto"
              to="/contact"
              onClick={handleClose}
            >
              Contact Us
            </Link>
            <button
              className="inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-6 sm:py-3 rounded-full font-bold text-base sm:text-sm cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-500/10 hover:text-primary-700 hover:border-primary-700 hover:-translate-y-0.5 hover:shadow-lg min-w-[160px] sm:min-w-0 w-full sm:w-auto"
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
