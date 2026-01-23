import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import FAQ from '../components/FAQ'
import TrustSignals from '../components/TrustSignals'
import Testimonials from '../components/Testimonials'
import EmailCapture from '../components/EmailCapture'
import { serviceAreas, servicePackages } from '../data/seed'

const Home = () => (
  <>
    <Helmet>
      <title>Mobile Car Detailing Greensboro NC | Piedmont Triad | Piedmont Detailers</title>
      <meta name="description" content="Professional mobile car detailing in Greensboro, Winston-Salem, and High Point. We come to you with 3 simple packages. Book your detail today - same week availability!" />
      <meta name="keywords" content="mobile car detailing Greensboro NC, car detailing Winston-Salem, mobile detailer High Point, car wash Piedmont Triad, professional car cleaning, mobile auto detailing" />
      <meta property="og:title" content="Mobile Car Detailing Greensboro NC | We Come to You" />
      <meta property="og:description" content="Professional mobile car detailing in Greensboro, Winston-Salem, and High Point. We come to you with 3 simple packages." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://piedmontdetailers.com/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Mobile Car Detailing Greensboro NC | Piedmont Detailers" />
      <meta name="twitter:description" content="Professional mobile car detailing in Greensboro, Winston-Salem, and High Point. We come to you with 3 simple packages." />
      <link rel="canonical" href="https://piedmontdetailers.com/" />
    </Helmet>
    <SEO
      title="Mobile Car Detailing Greensboro NC | Piedmont Triad"
      description="Professional mobile car detailing in Greensboro, Winston-Salem, and High Point. We come to you with 3 simple packages. Book your detail today - same week availability!"
      keywords="mobile car detailing Greensboro NC, car detailing Winston-Salem, mobile detailer High Point, car wash Piedmont Triad, professional car cleaning, mobile auto detailing"
      url="/"
    />
    <div className="flex flex-col gap-0">
    <section className="bg-gradient-to-br from-primary-700 via-primary-500 via-primary-400 to-sky-300 text-white py-16 sm:py-12 md:py-18 relative overflow-hidden">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-8 md:gap-6 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 tracking-tight text-white drop-shadow-lg">
              Mobile Car Detailing Greensboro NC We Come to You
            </h1>
            <p className="text-lg sm:text-base md:text-lg text-white/98 mb-6 leading-relaxed font-normal">
              Choose from 3 simple packages. We come to your home or office with everything we need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl"
                to="/contact"
              >
                Book Now
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white/15 text-white border-2 border-white/40 backdrop-blur-sm hover:bg-white/25 hover:border-white/60 hover:-translate-y-0.5 hover:shadow-lg"
                to="/services"
              >
                View Packages
              </Link>
            </div>
          </div>
          <div className="bg-white/98 text-white p-8 sm:p-6 md:p-8 rounded-2xl shadow-2xl border-2 border-slate-200 backdrop-blur-xl relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-3xl hover:border-primary-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300" />
            <h3 className="text-2xl sm:text-xl md:text-2xl font-bold mb-4 text-white">
              How It Works
            </h3>
            <ul className="list-none p-0 m-0 grid gap-2.5">
              <li className="flex items-start text-white/95 leading-relaxed text-sm sm:text-sm md:text-base">
                <span className="text-white mr-3 font-extrabold text-lg flex-shrink-0 mt-0.5">
                  ✓
                </span>
                We bring everything - water, supplies, and equipment
              </li>
              <li className="flex items-start text-white/95 leading-relaxed text-sm sm:text-sm md:text-base">
                <span className="text-white mr-3 font-extrabold text-lg flex-shrink-0 mt-0.5">
                  ✓
                </span>
                You choose a package and pick a time
              </li>
              <li className="flex items-start text-white/95 leading-relaxed text-sm sm:text-sm md:text-base">
                <span className="text-white mr-3 font-extrabold text-lg flex-shrink-0 mt-0.5">
                  ✓
                </span>
                We show up and clean your car
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-12 md:py-16">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 sm:mb-8 max-w-3xl">
          <h2 className="text-4xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-slate-800 tracking-tight">
            Professional Car Detailing Packages in the Piedmont Triad
          </h2>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
            Three simple options. Pick what you need.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-6">
          {servicePackages.map((pkg, index) => (
            <div
              key={pkg.title}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-10 sm:p-7 md:p-8 lg:p-10 shadow-lg border-2 border-transparent relative overflow-visible transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:border-primary-200"
            >
              <div className="absolute -top-6 right-8 sm:right-6 bg-gradient-to-br from-primary-700 to-primary-500 text-white text-3xl sm:text-2xl md:text-3xl font-extrabold w-14 h-14 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl border-4 border-white/80 transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-2xl">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-4 sm:mt-2 text-slate-800 text-2xl sm:text-xl md:text-2xl font-bold leading-tight mb-4">
                {pkg.title} - Professional Car Detailing Service
              </h3>
              <p className="text-slate-500 leading-relaxed text-base sm:text-sm md:text-base mb-6">
                {pkg.details}
              </p>
              <Link
                className="text-primary-500 no-underline font-bold mt-auto transition-all duration-300 inline-flex items-center gap-2 text-base sm:text-sm md:text-base hover:text-primary-700 hover:gap-3"
                to="/services"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 sm:mb-8 max-w-3xl">
          <h2 className="text-4xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-slate-800 tracking-tight">
            Mobile Car Detailing Service Areas: Greensboro, Winston-Salem & High Point
          </h2>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
            We come to you anywhere in the region. <Link to="/contact" className="text-primary-500 hover:underline font-semibold">Contact us</Link> to see if we serve your area, or <Link to="/services" className="text-primary-500 hover:underline font-semibold">view our service packages</Link>.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-4">
          {serviceAreas.map((area) => (
            <div
              key={area}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 sm:p-6 flex items-center gap-5 shadow-md border-2 border-transparent relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-xl hover:border-primary-200"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-primary-400 scale-y-0 origin-top transition-transform duration-300 hover:scale-y-100" />
              <div className="text-3xl sm:text-2xl md:text-3xl drop-shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-6">
                📍
              </div>
              <span className="font-bold text-slate-800 text-lg sm:text-base md:text-lg tracking-tight">
                {area}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-12 md:py-16">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary-700 via-primary-500 via-primary-400 to-sky-300 text-white rounded-3xl p-16 sm:p-8 md:p-12 flex flex-wrap items-center justify-between gap-8 relative overflow-hidden shadow-2xl border border-white/20">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-radial-gradient from-white/10 via-transparent to-transparent animate-pulse" />
          <div className="relative z-10 flex-1 min-w-[300px]">
            <h2 className="text-4xl sm:text-3xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
              Book Your Mobile Car Detailing Service Today
            </h2>
            <p className="text-xl sm:text-lg md:text-xl leading-relaxed text-white/95 max-w-2xl">
              Call us or book online. We'll come to your location and clean your car.
            </p>
          </div>
          <div className="flex gap-5 flex-wrap relative z-10">
            <a
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl w-full sm:w-auto"
              href="tel:+13365550123"
            >
              Call Now
            </a>
            <Link
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white/15 text-white border-2 border-white/40 backdrop-blur-sm hover:bg-white/25 hover:border-white/60 hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto"
              to="/booking"
            >
              Book Online
            </Link>
          </div>
        </div>
      </div>
    </section>

    <TrustSignals />
    <Testimonials />
    <FAQ />
    <EmailCapture />
  </div>
  </>
)

export default Home
