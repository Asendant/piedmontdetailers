import { useState, useEffect, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import WelcomeModal from './WelcomeModal'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Videos', to: '/videos' },
  { label: 'Contact', to: '/contact' },
  { label: 'Book Now', to: '/booking' },
]

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileMenuOpen])

  return (
    <div className="app">
      <WelcomeModal />
      <header className="site-header">
        <div className="container header-content">
          <div className="logo">
            <span className="logo-mark">PD</span>
            <div>
              <p className="logo-title">Piedmont Detailers</p>
              <p className="logo-subtitle">Mobile Detailing • Triad, NC</p>
            </div>
          </div>
          <nav className="nav desktop-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <a className="btn btn-primary desktop-call-btn" href="tel:+13365550123">
              Call Now
            </a>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <HiX className="menu-icon" />
              ) : (
                <HiMenu className="menu-icon" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu Backdrop */}
        {mobileMenuOpen && (
          <div
            className="mobile-menu-backdrop"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
                }
                onClick={closeMobileMenu}
              >
                {item.label}
              </NavLink>
            ))}
            <a
              className="btn btn-primary mobile-call-btn"
              href="tel:+13365550123"
              onClick={closeMobileMenu}
            >
              Call Now
            </a>
          </nav>
        </div>
      </header>
    <main>{children}</main>
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>Piedmont Detailers</h4>
          <p>
            Premium mobile detailing across the Piedmont Triad. We bring the
            shop to you with professional-grade tools and products.
          </p>
        </div>
        <div>
          <h4>Service Area</h4>
          <p>All counties within the Piedmont Triad region of North Carolina.</p>
          <p>
            <strong>Hours:</strong> Mon-Sat 8am-6pm
            <br />
            <strong>Phone:</strong> <a href="tel:+13365550123" style={{color: 'inherit', textDecoration: 'underline'}}>(336) 555-0123</a>
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <NavLink to="/gallery">Gallery</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/videos">Videos</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Book Now</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Piedmont Detailers. All rights reserved.</p>
      </div>
    </footer>
    </div>
  )
}

export default Layout
