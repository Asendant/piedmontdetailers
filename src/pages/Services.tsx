import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import { servicePackages } from '../data/seed'
import { getServiceRoute } from '../utils/routes'

const processSteps = [
  {
    title: 'Book',
    description:
      'Choose your package and pick a date and time that works for you.',
  },
  {
    title: 'We Arrive',
    description:
      'We show up at your location with everything we need.',
  },
  {
    title: 'We Clean',
    description:
      'We clean your car while you relax. When we\'re done, your car looks great.',
  },
]

const Services = () => (
  <>
    <Helmet>
      <title>Car Detailing Packages Greensboro NC | Interior, Exterior & Full Wash | Piedmont Detailers</title>
      <meta name="description" content="Professional car detailing packages in Greensboro, Winston-Salem & High Point. Choose Interior, Exterior, or Full Wash. Mobile service - we come to you. Book today!" />
      <meta name="keywords" content="car detailing packages Greensboro NC, interior car detailing, exterior car wash, full detail service, mobile car detailing packages, professional car cleaning" />
      <meta property="og:title" content="Car Detailing Packages Greensboro NC | Interior, Exterior & Full Wash" />
      <meta property="og:description" content="Professional car detailing packages in Greensboro, Winston-Salem & High Point. Choose Interior, Exterior, or Full Wash. Mobile service - we come to you." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://piedmontdetailers.com/services" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Car Detailing Packages Greensboro NC | Piedmont Detailers" />
      <meta name="twitter:description" content="Professional car detailing packages in Greensboro, Winston-Salem & High Point. Choose Interior, Exterior, or Full Wash." />
      <link rel="canonical" href="https://piedmontdetailers.com/services" />
    </Helmet>
    <SEO
      title="Car Detailing Packages Greensboro NC | Interior, Exterior & Full Wash"
      description="Professional car detailing packages in Greensboro, Winston-Salem & High Point. Choose Interior, Exterior, or Full Wash. Mobile service - we come to you. Book today!"
      keywords="car detailing packages Greensboro NC, interior car detailing, exterior car wash, full detail service, mobile car detailing packages, professional car cleaning"
      url="/services"
    />
    <div className="flex flex-col gap-0">
    <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-primary-700 via-primary-500 via-primary-400 to-sky-300 text-white relative overflow-hidden">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-white drop-shadow-lg">
          Car Detailing Packages in the Piedmont Triad
        </h1>
        <p className="text-lg sm:text-base md:text-lg text-white/98 leading-relaxed max-w-3xl">
          Three simple options. Pick what you need.
        </p>
      </div>
    </section>

    <section className="py-20 sm:py-12 md:py-16">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-6">
          {servicePackages.map((pkg) => (
            <div
              key={pkg.title}
              className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 sm:p-6 md:p-8 shadow-lg border-2 border-primary-100 transition-all duration-400 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-primary-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 scale-x-0 origin-left transition-transform duration-400 hover:scale-x-100" />
              <h3 className="m-0 text-slate-800 text-2xl sm:text-xl md:text-2xl font-bold leading-tight mb-4">
                {pkg.title}
              </h3>
              <p className="text-slate-500 leading-relaxed m-0 text-base sm:text-sm md:text-base mb-4">
                {pkg.details}
              </p>
              {'includes' in pkg && pkg.includes && (
                <div className="mb-4">
                  <h4 className="text-slate-800 font-bold text-sm mb-2">What's Included:</h4>
                  <ul className="space-y-1.5 mb-4">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="text-slate-600 text-sm flex items-start">
                        <span className="text-primary-500 mr-2 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {'benefits' in pkg && pkg.benefits && (
                <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                  <h4 className="text-slate-800 font-bold text-sm mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {pkg.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-slate-700 text-sm">
                        • {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-slate-600 text-sm mb-2">
                  <strong className="text-slate-800">Starting at:</strong> Contact us for a custom quote based on your vehicle size and specific needs.
                </p>
                <p className="text-slate-500 text-xs">
                  Transparent pricing with no hidden fees. We'll provide a detailed quote before you book.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-xl w-full justify-center"
                  to={getServiceRoute(pkg.title)}
                >
                  Learn More About {pkg.title}
                </Link>
                <p className="text-center text-xs text-slate-500 mt-2">
                  Or <Link to="/booking" className="text-primary-500 hover:underline font-semibold">book now</Link> or <Link to="/contact" className="text-primary-500 hover:underline font-semibold">contact us</Link> for a custom quote
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white relative">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 sm:mb-8 max-w-3xl">
          <h2 className="text-4xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-slate-800 tracking-tight">
            How Our Mobile Car Detailing Process Works
          </h2>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
            Simple. Easy. Done. We make professional car detailing convenient for residents of Greensboro, Winston-Salem, High Point, and the entire Piedmont Triad. <Link to="/about" className="text-primary-500 hover:underline font-semibold">Learn more about us</Link> or <Link to="/contact" className="text-primary-500 hover:underline font-semibold">contact us</Link> with questions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step) => (
            <div
              key={step.title}
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-md border-2 border-transparent relative overflow-hidden transition-all duration-300 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl hover:border-primary-200"
            >
              <div className="absolute top-0 left-0 right-0 h-0.75 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100" />
              <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 m-0 leading-tight">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed m-0 text-base sm:text-sm md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
  </>
)

export default Services
