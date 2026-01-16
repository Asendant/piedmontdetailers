import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    service: 'Full Detail' as PackageType,
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
        <SEO
          title="Booking Confirmed"
          description="Your booking request has been submitted successfully. We'll confirm your appointment within 24 hours."
          url="/booking"
        />
        <div className="page">
        <section className="page-hero">
          <div className="container">
            <div className="booking-success">
              <h1>Booking Request Submitted!</h1>
              <p>Thank you, {formData.name}! Your booking request has been received.</p>
              <p>We'll confirm your appointment within 24 hours via phone or email.</p>
              <div className="booking-summary">
                <h3>Booking Summary</h3>
                <p><strong>Service:</strong> {formData.service}</p>
                <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p><strong>Time:</strong> {formData.time}</p>
                <p><strong>Location:</strong> {formData.address}, {formData.city}, {formData.county}</p>
              </div>
              <a className="btn btn-primary" href="/">
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
      <SEO
        title="Book Your Mobile Detailing Service"
        description="Schedule your mobile car detailing service. Choose your service, date, and location. We'll confirm your appointment and arrive fully equipped at your location."
        keywords="book car detailing, schedule detailing, mobile detailing appointment, online booking, car detailing booking"
        url="/booking"
      />
      {showNotAvailableModal && (
        <div className="booking-not-available-modal-overlay">
          <div className="booking-not-available-modal">
            <div className="booking-not-available-modal-content">
              <div className="booking-not-available-modal-icon">📅</div>
              <h2>Online Booking Coming Soon</h2>
              <p className="booking-not-available-modal-intro">
                We're currently in the planning stages and will be opening in <strong>September 2026</strong>.
              </p>
              <p>
                Online booking isn't available yet, but we'd love to hear from you! Contact us to show your interest, ask questions, or be notified when we officially launch.
              </p>
              <div className="booking-not-available-modal-actions">
                <Link 
                  className="btn btn-primary" 
                  to="/contact"
                  onClick={handleModalClose}
                >
                  Contact Us
                </Link>
                <button 
                  className="btn btn-secondary" 
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
      <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Book Your Detail</p>
          <h1>Schedule Your Mobile Detailing Service</h1>
          <p>
            Choose your service, date, and location. We'll confirm your appointment 
            and arrive fully equipped at your location.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="booking-step">
              <h2>Step 1: Service & Location</h2>
              <div className="form-grid">
                <label>
                  Service Package *
                  <select 
                    value={formData.service} 
                    onChange={(e) => updateFormData('service', e.target.value)}
                    required
                  >
                    {servicePackages.map(pkg => (
                      <option key={pkg.title} value={pkg.title}>{pkg.title}</option>
                    ))}
                  </select>
                </label>
                <label>
                  County *
                  <select 
                    value={formData.county} 
                    onChange={(e) => updateFormData('county', e.target.value)}
                    required
                  >
                    <option value="">Select a county</option>
                    {serviceAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Street Address *
                  <input 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    required
                    placeholder="123 Main St"
                  />
                </label>
                <label>
                  City *
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    required
                    placeholder="Greensboro"
                  />
                </label>
              </div>
            </div>

            <div className="booking-step">
              <h2>Step 2: Date & Time</h2>
              <div className="form-grid">
                <label>
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
                  />
                  <small>Available Monday-Saturday, 8am-6pm</small>
                </label>
                <label>
                  Preferred Time *
                  <select 
                    value={formData.time} 
                    onChange={(e) => updateFormData('time', e.target.value)}
                    required
                    disabled={!formData.date || !formData.county || availableTimes.length === 0}
                  >
                    <option value="">
                      {!formData.date || !formData.county 
                        ? 'Select date and county first' 
                        : availableTimes.length === 0 
                        ? 'No available times (conflicts with existing bookings)'
                        : 'Select a time'}
                    </option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {formData.date && formData.county && availableTimes.length > 0 && (
                    <small>{availableTimes.length} time slots available</small>
                  )}
                </label>
              </div>
            </div>

            <div className="booking-step">
              <h2>Step 3: Contact & Vehicle Info</h2>
              <div className="form-grid">
                <label>
                  Full Name *
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    required
                  />
                </label>
                <label>
                  Phone Number *
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    required
                    placeholder="(336) 555-0123"
                  />
                </label>
                <label>
                  Email
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="your@email.com"
                  />
                </label>
                <label>
                  Vehicle Details *
                  <input 
                    type="text" 
                    value={formData.vehicle}
                    onChange={(e) => updateFormData('vehicle', e.target.value)}
                    required
                    placeholder="2020 Toyota Camry"
                  />
                </label>
                <label className="full-width">
                  Additional Notes
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    rows={4}
                    placeholder="Any special requests or concerns..."
                  />
                </label>
              </div>
            </div>

            <div className="booking-actions">
              <button type="submit" className="btn btn-primary" disabled={!formData.time}>
                Submit Booking Request
              </button>
              <p className="booking-note">
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
