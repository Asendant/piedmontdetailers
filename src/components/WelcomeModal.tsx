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
    <div className="welcome-modal-overlay" onClick={handleClose}>
      <div className="welcome-modal" onClick={(e) => e.stopPropagation()}>
        <button className="welcome-modal-close" onClick={handleClose} aria-label="Close">
          ×
        </button>
        <div className="welcome-modal-content">
          <div className="welcome-modal-icon">🚗✨</div>
          <h2>Thank You for Your Interest!</h2>
          <p className="welcome-modal-intro">
            We're excited to announce that <strong>Piedmont Detailers</strong> is currently in the planning stages and will be opening in <strong>September 2026</strong>.
          </p>
          <p>
            We're building something special to bring premium mobile car detailing services to the Piedmont Triad. While we're not quite ready to take bookings yet, we'd love to hear from you!
          </p>
          <p className="welcome-modal-cta-text">
            Contact us to show your interest, ask questions, or be notified when we officially launch.
          </p>
          <div className="welcome-modal-actions">
            <Link 
              className="btn btn-primary" 
              to="/contact"
              onClick={handleClose}
            >
              Contact Us
            </Link>
            <button 
              className="btn btn-secondary" 
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
