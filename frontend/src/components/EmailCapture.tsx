import { useState } from 'react'
import { subscribeEmail } from '../utils/api'

const EmailCapture = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await subscribeEmail(email)
    
    if (result.success) {
      setSubmitted(true)
      setEmail('')
    } else {
      setError(result.message)
    }
    
    setLoading(false)
  }

  return (
    <section className="py-16 sm:py-12 bg-gradient-to-br from-primary-700 via-primary-500 via-primary-400 to-sky-300 text-white">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-2xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-lg">
            Get Notified When We Launch
          </h2>
          <p className="text-lg sm:text-base text-white/95 mb-6">
            We're launching in September 2026. Join our email list to be the first to know when booking opens and get early access to special offers.
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                placeholder="Enter your email"
                required
                disabled={loading}
                className="flex-1 px-5 py-3 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 focus:outline-none focus:border-white/50 focus:bg-white/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-full font-bold text-sm bg-white text-primary-700 hover:bg-slate-50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Subscribing...' : 'Notify Me'}
              </button>
            </form>
          ) : (
            <p className="text-white/95 font-semibold">
              ✓ Thanks! We'll notify you when we launch.
            </p>
          )}
          {error && (
            <p className="text-red-200 text-sm mt-2">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default EmailCapture
