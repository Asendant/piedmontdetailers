import { useState, useEffect, useRef, type ReactNode } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import { FaFacebook, FaInstagram, FaGoogle } from 'react-icons/fa'
import WelcomeModal from './WelcomeModal'
import { counties } from '../data/locations'
import { servicePackages } from '../data/seed'
import { getServiceRoute } from '../utils/routes'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const locationsDropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileServicesOpen(false)
    setMobileLocationsOpen(false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false)
      }
      if (locationsDropdownRef.current && !locationsDropdownRef.current.contains(event.target as Node)) {
        setLocationsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close dropdowns when route changes
  useEffect(() => {
    setServicesDropdownOpen(false)
    setLocationsDropdownOpen(false)
    setMobileServicesOpen(false)
    setMobileLocationsOpen(false)
  }, [location.pathname])

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
      <header className="bg-gradient-to-br from-primary-700 via-primary-500 to-primary-400 text-white sticky top-0 z-[101] shadow-lg border-b border-white/10 overflow-visible">
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 py-4 relative flex-wrap">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="bg-white text-primary-700 font-bold px-2.5 py-1.5 rounded-lg shadow-md text-sm sm:text-base">PD</span>
              <div>
                <p className="font-semibold text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis">Piedmont Detailers</p>
                <p className="text-xs sm:text-sm text-white/90 whitespace-nowrap overflow-hidden text-ellipsis">Mobile Detailing • Triad, NC</p>
              </div>
            </div>
            <nav className="hidden lg:flex flex-wrap gap-3 scrollbar-none items-center relative z-[102]">
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
              
              {/* Services Dropdown */}
              <div className="relative" ref={servicesDropdownRef}>
                <button
                  onClick={() => {
                    setServicesDropdownOpen(!servicesDropdownOpen)
                    setLocationsDropdownOpen(false)
                  }}
                  className={`text-white/95 no-underline text-sm px-2.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1 ${
                    location.pathname.startsWith('/services')
                      ? 'bg-white/25 text-white'
                      : 'hover:bg-white/25 hover:text-white'
                  }`}
                >
                  Services
                  <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border-2 border-primary-100 overflow-hidden z-[102]">
                    <Link
                      to="/services"
                      className="block px-4 py-3 text-slate-800 hover:bg-primary-50 transition-colors font-semibold border-b border-slate-200"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      All Services
                    </Link>
                    {servicePackages.map((pkg) => (
                      <Link
                        key={pkg.title}
                        to={getServiceRoute(pkg.title)}
                        className="block px-4 py-3 text-slate-700 hover:bg-primary-50 transition-colors"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        {pkg.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Locations Dropdown */}
              <div className="relative" ref={locationsDropdownRef}>
                <button
                  onClick={() => {
                    setLocationsDropdownOpen(!locationsDropdownOpen)
                    setServicesDropdownOpen(false)
                  }}
                  className={`text-white/95 no-underline text-sm px-2.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1 ${
                    location.pathname.startsWith('/locations')
                      ? 'bg-white/25 text-white'
                      : 'hover:bg-white/25 hover:text-white'
                  }`}
                >
                  Locations
                  <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${locationsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {locationsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border-2 border-primary-100 overflow-hidden z-[102] max-h-96 overflow-y-auto">
                    {counties.map((county) => (
                      <Link
                        key={county.slug}
                        to={`/locations/${county.slug}`}
                        className="block px-4 py-3 text-slate-700 hover:bg-primary-50 transition-colors"
                        onClick={() => setLocationsDropdownOpen(false)}
                      >
                        <div className="font-semibold text-slate-800">{county.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{county.cities.slice(0, 3).join(', ')}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
            
            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={`block w-full text-left text-white/95 no-underline text-base sm:text-lg px-8 py-4 transition-all duration-200 border-b border-white/10 flex items-center justify-between ${
                  location.pathname.startsWith('/services')
                    ? 'bg-white/15 text-white'
                    : 'hover:bg-white/15 hover:text-white'
                }`}
              >
                Services
                <HiChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="bg-white/10 border-b border-white/10">
                  <Link
                    to="/services"
                    className="block text-white/95 no-underline text-base px-12 py-3 hover:bg-white/15 transition-colors font-semibold"
                    onClick={closeMobileMenu}
                  >
                    All Services
                  </Link>
                  {servicePackages.map((pkg) => (
                    <Link
                      key={pkg.title}
                      to={getServiceRoute(pkg.title)}
                      className="block text-white/95 no-underline text-base px-12 py-3 hover:bg-white/15 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {pkg.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Locations Dropdown */}
            <div>
              <button
                onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                className={`block w-full text-left text-white/95 no-underline text-base sm:text-lg px-8 py-4 transition-all duration-200 border-b border-white/10 flex items-center justify-between ${
                  location.pathname.startsWith('/locations')
                    ? 'bg-white/15 text-white'
                    : 'hover:bg-white/15 hover:text-white'
                }`}
              >
                Locations
                <HiChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileLocationsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileLocationsOpen && (
                <div className="bg-white/10 border-b border-white/10 max-h-96 overflow-y-auto">
                  {counties.map((county) => (
                    <Link
                      key={county.slug}
                      to={`/locations/${county.slug}`}
                      className="block text-white/95 no-underline text-base px-12 py-3 hover:bg-white/15 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <div className="font-semibold">{county.name}</div>
                      <div className="text-xs text-white/70 mt-1">{county.cities.slice(0, 3).join(', ')}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
              <p className="text-white/95 text-sm leading-relaxed mb-4">
                Premium mobile detailing across the Piedmont Triad. We bring the
                shop to you with professional-grade tools and products.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/piedmontdetailers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/95 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href="https://www.instagram.com/piedmontdetailers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/95 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href="https://www.google.com/maps/place/Piedmont+Detailers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/95 hover:text-white transition-colors"
                  aria-label="Google Business"
                >
                  <FaGoogle className="text-xl" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">Service Areas</h4>
              <ul className="text-white/95 text-sm leading-relaxed space-y-1">
                <li>Greensboro, NC</li>
                <li>Winston-Salem, NC</li>
                <li>High Point, NC</li>
                <li>Guilford County</li>
                <li>Forsyth County</li>
                <li>Davidson County</li>
                <li>Randolph County</li>
                <li>Stokes County</li>
                <li>Surry County</li>
                <li>Yadkin County</li>
              </ul>
              <p className="text-white/95 text-sm leading-relaxed mt-3">
                <strong>Hours:</strong> Monday - Saturday, 8am - 6pm
                <br />
                <strong>Phone:</strong>{' '}
                <a
                  href="tel:+13363109061"
                  className="underline hover:text-white"
                >
                  (336) 310-9061
                </a>
                <br />
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:business@piedmontdetailers.com"
                  className="underline hover:text-white"
                >
                  business@piedmontdetailers.com
                </a>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">Quick Links</h4>
              <ul className="flex flex-col gap-2 justify-center md:justify-start">
                <li>
                  <NavLink
                    to="/services"
                    className="text-white/95 hover:text-white hover:underline transition-colors duration-200"
                  >
                    Services
                  </NavLink>
                </li>
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
                    to="/about"
                    className="text-white/95 hover:text-white hover:underline transition-colors duration-200"
                  >
                    About Us
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
                <li>
                  <NavLink
                    to="/booking"
                    className="text-white/95 hover:text-white hover:underline transition-colors duration-200"
                  >
                    Book Online
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 border-t border-white/30 pt-4 text-center text-sm text-white/90">
            <p className="mb-2">© 2025 Piedmont Detailers. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/privacy" className="text-white/90 hover:text-white hover:underline">
                Privacy Policy
              </Link>
              <span className="text-white/50">|</span>
              <Link to="/terms" className="text-white/90 hover:text-white hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
