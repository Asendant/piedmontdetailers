import { Link } from 'react-router-dom'
import { useState } from 'react'
import SEO from '../components/SEO'

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <SEO
        title="Contact Us - Book Your Mobile Detail"
        description="Contact Piedmont Detailers to schedule your mobile car detailing service. We come to you anywhere in the Piedmont Triad. Call (336) 555-0123 or request a quote online."
        keywords="contact piedmont detailers, book car detailing, mobile detailing quote, Piedmont Triad detailer contact"
        url="/contact"
      />
      <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Book Your Detail</p>
          <h1>We Come to You Anywhere in the Triad</h1>
          <p>
            Tell us about your vehicle and we will respond with availability
            and a custom quote. Our mobile service makes it easy to get professional detailing without leaving your home or office.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-map-section">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208715.5989043651!2d-80.053126!3d36.0726354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8853ae6b8a5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sPiedmont%20Triad%2C%20NC!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '1rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Piedmont Triad Service Area"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container contact-grid">
          <div className="card">
            <h3>Contact Details</h3>
            <p>
              <strong>Phone:</strong> <a href="tel:+13365550123">(336) 555-0123</a>
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:business@piedmontdetailers.com">
                business@piedmontdetailers.com
              </a>
            </p>
            <p><strong>Hours:</strong> Mon-Sat 8am-6pm</p>
            <p><strong>Service Area:</strong> All counties within the Piedmont Triad region of North Carolina.</p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link className="btn btn-primary" to="/booking" style={{ display: 'inline-block' }}>
                Book Online
              </Link>
            </div>
          </div>
          <form
            className="card form-card"
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <h3>Request a Quote</h3>
            <label>
              Full name
              <input type="text" name="name" required />
            </label>
            <label>
              Phone number
              <input type="tel" name="phone" required />
            </label>
            <label>
              Vehicle details
              <input type="text" name="vehicle" placeholder="Year, make, model" />
            </label>
            <label>
              Service needed
              <select name="service" defaultValue="Full Detail">
                <option>Express Wash</option>
                <option>Full Detail</option>
                <option>Interior Deep Clean</option>
                <option>Paint Correction</option>
                <option>Ceramic Coating</option>
              </select>
            </label>
            <label>
              Notes
              <textarea name="notes" rows={4} />
            </label>
            <button className="btn btn-primary" type="submit">
              Send request
            </button>
            {submitted ? (
              <p className="form-success">
                Thanks! We will follow up within one business day.
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
    </>
  )
}

export default Contact
