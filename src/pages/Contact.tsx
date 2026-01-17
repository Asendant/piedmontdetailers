import { Link } from 'react-router-dom'
import { useState } from 'react'
import SEO from '../components/SEO'

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <SEO
      title="Contact Us"
      description="Contact us to book your car cleaning service. Call (336) 555-0123 or send us a message."
      keywords="contact piedmont detailers, book car cleaning, car detailing contact, Piedmont Triad"
        url="/contact"
      />
      <div className="flex flex-col gap-0">
      <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-sky-300/5 pointer-events-none" />
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
            Contact Us
          </h1>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-3xl">
            Call us or fill out the form below. We'll get back to you quickly.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-12 md:py-16">
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="w-full h-[450px] sm:h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl border-2 border-primary-100 transition-all duration-300 hover:shadow-2xl hover:border-primary-200">
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

      <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-6">
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-md border-2 border-transparent relative overflow-hidden transition-all duration-300 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl hover:border-primary-200">
              <div className="absolute top-0 left-0 right-0 h-0.75 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100" />
              <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 m-0 leading-tight">
                Get in Touch
              </h3>
              <p className="text-slate-600 leading-relaxed m-0 text-base">
                <strong className="text-slate-800">Phone:</strong>{' '}
                <a href="tel:+3363109061" className="text-primary-600 hover:text-primary-700 underline">
                  (336) 310-9061
                </a>
              </p>
              <p className="text-slate-600 leading-relaxed m-0 text-base">
                <strong className="text-slate-800">Email:</strong>{' '}
                <a
                  href="mailto:business@piedmontdetailers.com"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  business@piedmontdetailers.com
                </a>
              </p>
              <p className="text-slate-600 leading-relaxed m-0 text-base">
                <strong className="text-slate-800">Hours:</strong> Monday - Saturday, 8am - 6pm
              </p>
              <div className="mt-6">
                <Link
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl"
                  to="/booking"
                >
                  Book Online
                </Link>
              </div>
            </div>
            <form
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-md border-2 border-transparent relative overflow-hidden transition-all duration-300 flex flex-col gap-6 hover:-translate-y-1 hover:shadow-xl hover:border-primary-200"
              onSubmit={(event) => {
                event.preventDefault()
                setSubmitted(true)
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.75 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100" />
              <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 m-0 leading-tight">
                Send Us a Message
              </h3>
              <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                Full name
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                />
              </label>
              <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                Phone number
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                />
              </label>
              <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                Vehicle details
                <input
                  type="text"
                  name="vehicle"
                  placeholder="Year, make, model"
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-400"
                />
              </label>
              <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                Service needed
                <select
                  name="service"
                  defaultValue="Full Wash Package"
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                >
                  <option>Interior Package</option>
                  <option>Exterior Package</option>
                  <option>Full Wash Package</option>
                </select>
              </label>
              <label className="grid gap-2.5 font-semibold text-slate-800 text-sm">
                Notes
                <textarea
                  name="notes"
                  rows={4}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-base transition-all duration-300 bg-white text-slate-800 font-normal resize-y hover:border-slate-300 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-400"
                />
              </label>
              <button
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl"
                type="submit"
              >
                Send request
              </button>
              {submitted ? (
                <p className="text-green-700 font-semibold px-6 py-4 bg-green-50 rounded-2xl border-2 border-green-200 mt-4 text-base">
                  Thanks! We will follow up within one business day.
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Contact
