import { useState, useEffect, type ReactNode } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import WelcomeModal from './WelcomeModal'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
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
    <div className="min-h-screen flex flex-col">
      <WelcomeModal />
      <header className="bg-gradient-to-br from-primary-700 via-primary-500 to-primary-400 text-white sticky top-0 z-[101] shadow-lg border-b border-white/10 overflow-x-hidden">
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 py-4 relative flex-wrap">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="bg-white text-primary-700 font-bold px-2.5 py-1.5 rounded-lg shadow-md text-sm sm:text-base">PD</span>
              <div>
                <p className="font-semibold text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis">Piedmont Detailers</p>
                <p className="text-xs sm:text-sm text-white/90 whitespace-nowrap overflow-hidden text-ellipsis">Mobile Detailing • Triad, NC</p>
              </div>
            </div>
            <nav className="hidden lg:flex flex-wrap gap-3 scrollbar-none">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-white/95 no-underline text-sm px-2.5 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'hover:bg-white/25 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link
                className="hidden lg:inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white/20 text-white border-2 border-white/40 backdrop-blur-sm hover:bg-white/30 hover:border-white/60 hover:-translate-y-0.5 hover:shadow-lg"
                to="/booking"
              >
                Book Now
              </Link>
              <button
                className="lg:hidden bg-transparent border-none cursor-pointer p-2 z-[100] relative text-white flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <HiX className="w-7 h-7 text-white transition-all duration-300" />
                ) : (
                  <HiMenu className="w-7 h-7 text-white transition-all duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu Backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[98] backdrop-blur-sm lg:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 right-0 bg-gradient-to-br from-primary-700 via-primary-500 to-primary-400 shadow-xl transition-all duration-300 ease-out z-[100] w-full lg:hidden overflow-hidden ${
            mobileMenuOpen ? 'max-h-screen overflow-y-auto' : 'max-h-0'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between gap-6 py-4 px-4 sm:px-6 border-b border-white/10">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="bg-white text-primary-700 font-bold px-2.5 py-1.5 rounded-lg shadow-md text-sm sm:text-base">PD</span>
              <div>
                <p className="font-semibold text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis">Piedmont Detailers</p>
                <p className="text-xs sm:text-sm text-white/90 whitespace-nowrap overflow-hidden text-ellipsis">Mobile Detailing • Triad, NC</p>
              </div>
            </div>
            <button
              className="bg-transparent border-none cursor-pointer p-2 z-[100] relative text-white flex items-center justify-center flex-shrink-0"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <HiX className="w-7 h-7 text-white transition-all duration-300" />
            </button>
          </div>
          <nav className="flex flex-col py-4 gap-0">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block text-white/95 no-underline text-base sm:text-lg px-8 py-4 transition-all duration-200 border-b border-white/10 ${
                    isActive
                      ? 'bg-white/15 text-white pl-10'
                      : 'hover:bg-white/15 hover:text-white hover:pl-10'
                  }`
                }
                onClick={closeMobileMenu}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              className="mx-8 mt-4 w-[calc(100%-4rem)] inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl"
              to="/booking"
              onClick={closeMobileMenu}
            >
              Book Now
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-auto bg-gradient-to-br from-primary-700 via-primary-500 to-primary-400 text-white py-12 sm:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center md:text-left">
            <div>
              <h4 className="text-lg font-bold mb-2">Piedmont Detailers</h4>
              <p className="text-white/95 text-sm leading-relaxed">
                Premium mobile detailing across the Piedmont Triad. We bring the
                shop to you with professional-grade tools and products.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">Service Area</h4>
              <p className="text-white/95 text-sm leading-relaxed mb-2">
                All counties within the Piedmont Triad region of North Carolina.
              </p>
              <p className="text-white/95 text-sm leading-relaxed">
                <strong>Hours:</strong> Mon-Sat 8am-6pm
                <br />
                <strong>Phone:</strong>{' '}
                <a
                  href="tel:+13365550123"
                  className="underline hover:text-white"
                >
                  (336) 555-0123
                </a>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">Quick Links</h4>
              <ul className="flex flex-col gap-2 justify-center md:justify-start">
                <li>
                  <NavLink
                    to="/gallery"
                    className="text-white/95 hover:text-white hover:underline transition-colors duration-200"
                  >
                    Gallery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="text-white/95 hover:text-white hover:underline transition-colors duration-200"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 border-t border-white/30 pt-4 text-center text-sm text-white/90">
            <p>© 2025 Piedmont Detailers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
