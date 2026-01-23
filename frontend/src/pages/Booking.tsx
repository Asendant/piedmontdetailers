import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import { servicePackages, serviceAreas } from '../data/seed'
import type { PackageType } from '../types'
import type { Booking } from '../types'

// County coordinates (approximate centers) for drive time calculation
const countyCoordinates: Record<string, { lat: number; lng: number }> = {
  'Guilford County': { lat: 36.0860, lng: -79.7910 },
  'Forsyth County': { lat: 36.0999, lng: -80.2442 },
  'Davidson County': { lat: 35.7877, lng: -80.2126 },
  'Randolph County': { lat: 35.7101, lng: -79.8064 },
  'Stokes County': { lat: 36.4015, lng: -80.2700 },
  'Surry County': { lat: 36.4140, lng: -80.6845 },
  'Yadkin County': { lat: 36.1606, lng: -80.6634 },
}

// Calculate approximate drive time in minutes between two counties
const calculateDriveTime = (county1: string, county2: string): number => {
  if (county1 === county2) return 15 // Same county, 15 min buffer
  
  const coord1 = countyCoordinates[county1]
  const coord2 = countyCoordinates[county2]
  
  if (!coord1 || !coord2) return 60 // Default if county not found
  
  // Haversine formula for distance
  const R = 3959 // Earth radius in miles
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180
  const dLon = (coord2.lng - coord1.lng) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  
  // Assume average speed of 45 mph, add 15 min buffer
  const driveTime = Math.ceil((distance / 45) * 60) + 15
  return Math.max(driveTime, 30) // Minimum 30 minutes
}

// Load existing bookings from localStorage
const loadBookings = (): Booking[] => {
  if (typeof window === 'undefined') return []
  const stored = window.localStorage.getItem('pd_bookings')
  if (!stored) return []
  try {
    return JSON.parse(stored) as Booking[]
  } catch {
    return []
  }
}

// Save bookings to localStorage
const saveBookings = (bookings: Booking[]) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem('pd_bookings', JSON.stringify(bookings))
}

const Booking = () => {
  const navigate = useNavigate()
  const [showNotAvailableModal, setShowNotAvailableModal] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    county: '',
    service: 'Full Wash Package' as PackageType,
    date: '',
    time: '',
    vehicle: '',
    notes: '',
  })
  const [bookings, setBookings] = useState<Booking[]>(loadBookings())
  const [submitted, setSubmitted] = useState(false)

  const handleModalClose = () => {
    setShowNotAvailableModal(false)
  }

  // Get available time slots for selected date
  const availableTimes = useMemo(() => {
    if (!formData.date || !formData.county) return []
    
    const selectedDate = new Date(formData.date)
    const dayOfWeek = selectedDate.getDay()
    
    // Only allow Mon-Sat (1-6)
    if (dayOfWeek === 0) return []
    
    const times = []
    for (let hour = 8; hour <= 16; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00`)
      if (hour < 16) {
        times.push(`${hour.toString().padStart(2, '0')}:30`)
      }
    }
    
    // Filter out times that conflict with existing bookings
    const conflictingTimes = bookings
      .filter(b => b.date === formData.date && b.status !== 'cancelled')
      .map(b => {
        return { time: b.time, county: b.county }
      })
    
    return times.filter(time => {
      const [hour, minute] = time.split(':').map(Number)
      const requestedTime = new Date(selectedDate)
      requestedTime.setHours(hour, minute || 0, 0, 0)
      
      // Check conflicts with existing bookings
      for (const conflict of conflictingTimes) {
        const [conflictHour, conflictMinute] = conflict.time.split(':').map(Number)
        const conflictTime = new Date(selectedDate)
        conflictTime.setHours(conflictHour, conflictMinute || 0, 0, 0)
        
        // Calculate drive time between counties
        const driveTime = calculateDriveTime(formData.county, conflict.county)
        const serviceDuration = 120 // Assume 2 hours per service
        
        // Check if times overlap considering drive time
        const timeDiff = Math.abs(requestedTime.getTime() - conflictTime.getTime()) / (1000 * 60)
        const minGap = driveTime + serviceDuration
        
        if (timeDiff < minGap) {
          return false
        }
      }
      
      return true
    })
  }, [formData.date, formData.county, bookings])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    
    const updatedBookings = [...bookings, newBooking]
    saveBookings(updatedBookings)
    setBookings(updatedBookings)
    setSubmitted(true)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Booking Confirmed | Piedmont Detailers | Piedmont Detailers</title>
          <meta name="description" content="Your mobile car detailing booking request has been submitted. We'll confirm your appointment within 24 hours via phone or email." />
          <meta property="og:title" content="Booking Confirmed | Piedmont Detailers" />
          <meta property="og:description" content="Your mobile car detailing booking request has been submitted. We'll confirm your appointment within 24 hours." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://piedmontdetailers.com/booking" />
          <link rel="canonical" href="https://piedmontdetailers.com/booking" />
        </Helmet>
        <SEO
          title="Booking Confirmed | Piedmont Detailers"
          description="Your mobile car detailing booking request has been submitted. We'll confirm your appointment within 24 hours via phone or email."
          url="/booking"
        />
        <div className="flex flex-col gap-0">
        <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-sky-300/5 pointer-events-none" />
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto py-8">
              <h1 className="text-4xl sm:text-3xl md:text-5xl font-extrabold mb-6 text-slate-800 bg-gradient-to-br from-primary-700 to-primary-500 bg-clip-text text-transparent">
                Booking Request Submitted!
              </h1>
              <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed mb-4">
                Thank you, {formData.name}! Your booking request has been received.
              </p>
              <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed mb-4">
                We'll confirm your appointment within 24 hours via phone or email.
              </p>
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-10 sm:p-6 md:p-8 my-10 text-left shadow-lg border-2 border-primary-100">
                <h3 className="text-slate-800 mb-6 text-2xl sm:text-xl md:text-2xl font-bold pb-4 border-b-2 border-primary-100">
                  Booking Summary
                </h3>
                <p className="my-3 text-slate-700 text-base sm:text-sm md:text-base leading-relaxed">
                  <strong className="text-slate-800 font-semibold">Service:</strong> {formData.service}
                </p>
                <p className="my-3 text-slate-700 text-base sm:text-sm md:text-base leading-relaxed">
                  <strong className="text-slate-800 font-semibold">Date:</strong> {new Date(formData.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="my-3 text-slate-700 text-base sm:text-sm md:text-base leading-relaxed">
                  <strong className="text-slate-800 font-semibold">Time:</strong> {formData.time}
                </p>
                <p className="my-3 text-slate-700 text-base sm:text-sm md:text-base leading-relaxed">
                  <strong className="text-slate-800 font-semibold">Location:</strong> {formData.address}, {formData.city}, {formData.county}
                </p>
              </div>
              <a
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl"
                href="/"
              >
                Return Home
              </a>
            </div>
          </div>
        </section>
      </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Book Mobile Car Detailing Online | Piedmont Detailers Greensboro NC | Piedmont Detailers</title>
        <meta name="description" content="Book your mobile car detailing service online. Choose Interior, Exterior, or Full Wash package. We come to your home or office in Greensboro, Winston-Salem, High Point & surrounding areas." />
        <meta name="keywords" content="book car detailing online, schedule mobile detailing, car detailing appointment Greensboro, online booking car wash, mobile detailer booking" />
        <meta property="og:title" content="Book Mobile Car Detailing Online | Piedmont Detailers" />
        <meta property="og:description" content="Book your mobile car detailing service online. Choose Interior, Exterior, or Full Wash package. We come to your home or office." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://piedmontdetailers.com/booking" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Book Mobile Car Detailing Online | Piedmont Detailers" />
        <meta name="twitter:description" content="Book your mobile car detailing service online. Choose Interior, Exterior, or Full Wash package." />
        <link rel="canonical" href="https://piedmontdetailers.com/booking" />
      </Helmet>
      <SEO
      title="Book Mobile Car Detailing Online | Piedmont Detailers Greensboro NC"
      description="Book your mobile car detailing service online. Choose Interior, Exterior, or Full Wash package. We come to your home or office in Greensboro, Winston-Salem, High Point & surrounding areas."
      keywords="book car detailing online, schedule mobile detailing, car detailing appointment Greensboro, online booking car wash, mobile detailer booking"
        url="/booking"
      />
      {showNotAvailableModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999] p-4 sm:p-8 backdrop-blur-sm animate-[fadeIn_0.3s_ease] overflow-y-auto">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl sm:rounded-3xl max-w-2xl w-full relative shadow-2xl border-2 border-white/20 animate-[slideUp_0.4s_cubic-bezier(0.4,0,0.2,1)] overflow-hidden my-auto max-h-[95vh] sm:max-h-[90vh] flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-700 via-primary-500 via-primary-400 to-sky-300" />
            <div className="p-6 sm:p-8 md:p-12 text-center flex-1 overflow-y-auto">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 drop-shadow-md">
                📅
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 m-0 mb-4 sm:mb-6 leading-tight bg-gradient-to-br from-primary-700 to-primary-500 bg-clip-text text-transparent">
                Online Booking Coming Soon
              </h2>
              <p className="text-base sm:text-lg md:text-lg text-slate-700 leading-relaxed m-0 mb-4 sm:mb-5 font-medium">
                We're currently in the planning stages and will be opening in <strong className="text-slate-800 font-bold">September 2026</strong>.
              </p>
              <p className="text-sm sm:text-base md:text-base text-slate-500 leading-relaxed m-0 mb-4 sm:mb-5">
                Online booking isn't available yet, but we'd love to hear from you! Contact us to show your interest, ask questions, or be notified when we officially launch.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
                <Link
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl w-full sm:w-auto"
                  to="/contact"
                  onClick={handleModalClose}
                >
                  Contact Us
                </Link>
                <button
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-500/10 hover:text-primary-700 hover:border-primary-700 hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto"
                  onClick={() => {
                    handleModalClose()
                    navigate('/')
                  }}
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-0">
      <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-sky-300/5 pointer-events-none" />
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
            Book Your Service
          </h1>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-3xl">
            Pick a package, choose a date and time, and tell us where to go. We'll confirm and show up ready to clean.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-12 md:py-16">
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-12 sm:p-6 md:p-10 mb-10 shadow-lg border-2 border-transparent transition-all duration-300 relative overflow-hidden hover:shadow-xl hover:border-primary-200">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300" />
              <h2 className="text-slate-800 mb-8 sm:mb-6 pb-6 border-b-2 border-primary-100 text-3xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-br from-primary-700 to-primary-500 bg-clip-text text-transparent">
                Step 1: Service & Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                  Service Package *
                  <select
                    value={formData.service}
                    onChange={(e) => updateFormData('service', e.target.value)}
                    required
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                  >
                    {servicePackages.map((pkg) => (
                      <option key={pkg.title} value={pkg.title}>
                        {pkg.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                  County *
                  <select
                    value={formData.county}
                    onChange={(e) => updateFormData('county', e.target.value)}
                    required
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                  >
                    <option value="">Select a county</option>
                    {serviceAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                  Street Address *
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    required
                    placeholder="123 Main St"
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-400"
                  />
                </label>
                <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                  City *
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    required
                    placeholder="Greensboro"
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-400"
                  />
                </label>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-12 sm:p-6 md:p-10 mb-10 shadow-lg border-2 border-transparent transition-all duration-300 relative overflow-hidden hover:shadow-xl hover:border-primary-200">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300" />
              <h2 className="text-slate-800 mb-8 sm:mb-6 pb-6 border-b-2 border-primary-100 text-3xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-br from-primary-700 to-primary-500 bg-clip-text text-transparent">
                Step 2: Date & Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                  Preferred Date *
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value)
                      const dayOfWeek = selectedDate.getDay()
                      // Only allow Mon-Sat (1-6), reject Sunday (0)
                      if (dayOfWeek === 0) {
                        alert('We are closed on Sundays. Please select a weekday (Monday-Saturday).')
                        return
                      }
                      updateFormData('date', e.target.value)
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                  />
                  <small className="text-slate-500 text-sm mt-1">Available Monday-Saturday, 8am-6pm</small>
                </label>
                <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                  Preferred Time *
                  <select
                    value={formData.time}
                    onChange={(e) => updateFormData('time', e.target.value)}
                    required
                    disabled={!formData.date || !formData.county || availableTimes.length === 0}
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!formData.date || !formData.county
                        ? 'Select date and county first'
                        : availableTimes.length === 0
                        ? 'No available times (conflicts with existing bookings)'
                        : 'Select a time'}
                    </option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {formData.date && formData.county && availableTimes.length > 0 && (
                    <small className="text-slate-500 text-sm mt-1">{availableTimes.length} time slots available</small>
                  )}
                </label>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-12 sm:p-6 md:p-10 mb-10 shadow-lg border-2 border-transparent transition-all duration-300 relative overflow-hidden hover:shadow-xl hover:border-primary-200">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300" />
              <h2 className="text-slate-800 mb-8 sm:mb-6 pb-6 border-b-2 border-primary-100 text-3xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-br from-primary-700 to-primary-500 bg-clip-text text-transparent">
                Step 3: Contact & Vehicle Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                  Full Name *
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    required
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                  />
                </label>
                <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                  Phone Number *
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    required
                    placeholder="(336) 555-0123"
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-400"
                  />
                </label>
                <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                  Email
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-400"
                  />
                </label>
                <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                  Vehicle Details *
                  <input
                    type="text"
                    value={formData.vehicle}
                    onChange={(e) => updateFormData('vehicle', e.target.value)}
                    required
                    placeholder="2020 Toyota Camry"
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-400"
                  />
                </label>
                <label className="grid gap-2.5 font-semibold text-slate-800 text-sm md:col-span-2">
                  Additional Notes
                  <textarea
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    rows={4}
                    placeholder="Any special requests or concerns..."
                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal resize-y hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-400"
                  />
                </label>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed min-w-[250px] sm:min-w-0 w-full sm:w-auto"
                disabled={!formData.time}
              >
                Submit Booking Request
              </button>
              <p className="mt-6 text-slate-500 text-sm sm:text-xs md:text-sm font-medium">
                * Required fields. We'll confirm your appointment within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
    </>
  )
}

const BookingPage = Booking
export default BookingPage
