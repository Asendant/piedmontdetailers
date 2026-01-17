import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from './SEO'
import { counties, type CountyInfo } from '../data/locations'
import { servicePackages } from '../data/seed'
import { getServiceRoute } from '../utils/routes'

type CountyPageProps = {
  countySlug: string
}

const CountyPage = ({ countySlug }: CountyPageProps) => {
  const county = counties.find((c) => c.slug === countySlug)
  
  if (!county) return null

  return (
    <>
      <Helmet>
        <title>Car Detailing {county.name} NC | Mobile Service in {county.cities[0]} & {county.cities[1]} | Piedmont Detailers</title>
        <meta name="description" content={county.description} />
        <meta name="keywords" content={`${county.primaryKeyword}, mobile car detailing ${county.name}, car detailing ${county.cities.join(', ')}`} />
        <meta property="og:title" content={`Car Detailing ${county.name} NC | Mobile Service | Piedmont Detailers`} />
        <meta property="og:description" content={county.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://piedmontdetailers.com/locations/${county.slug}`} />
        <link rel="canonical" href={`https://piedmontdetailers.com/locations/${county.slug}`} />
      </Helmet>
      <SEO
        title={`Car Detailing ${county.name} NC | Mobile Service in ${county.cities[0]} & ${county.cities[1]}`}
        description={county.description}
        keywords={`${county.primaryKeyword}, mobile car detailing ${county.name}, car detailing ${county.cities.join(', ')}`}
        url={`/locations/${county.slug}`}
      />
      <div className="flex flex-col gap-0">
        <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-primary-700 via-primary-500 via-primary-400 to-sky-300 text-white relative overflow-hidden">
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-white drop-shadow-lg">
              Car Detailing Services in {county.name}
            </h1>
            <p className="text-lg sm:text-base md:text-lg text-white/98 leading-relaxed max-w-3xl">
              {county.description}
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-12 md:py-16">
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-3xl sm:text-2xl md:text-4xl font-extrabold leading-tight mb-6 text-slate-800 tracking-tight">
                  Cities We Serve in {county.name}
                </h2>
                <p className="text-lg sm:text-base md:text-lg text-slate-600 leading-relaxed mb-8">
                  Our mobile car detailing service is available throughout {county.name}, bringing professional car cleaning directly to residents in the following cities and communities:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {county.cities.map((city, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-md border-2 border-slate-200">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{city}</h3>
                      <p className="text-slate-600 text-sm">
                        Professional mobile car detailing services available in {city}, {county.name}.
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 mb-4">Our Services in {county.name}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    We offer comprehensive mobile car detailing services throughout {county.name}, including {county.cities[0]}, {county.cities[1]}, and all surrounding areas. Our mobile service means we bring everything to your location - you don't need to go anywhere.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {servicePackages.map((pkg) => (
                      <div key={pkg.title} className="bg-white rounded-xl p-6 shadow-md border-2 border-slate-200">
                        <h4 className="text-lg font-bold text-slate-800 mb-2">{pkg.title}</h4>
                        <p className="text-slate-600 text-sm mb-4">{pkg.details}</p>
                        <Link
                          to={getServiceRoute(pkg.title)}
                          className="text-primary-500 hover:underline font-semibold text-sm"
                        >
                          Learn more →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8 p-6 bg-primary-50 rounded-lg border-2 border-primary-200">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Why Choose Mobile Detailing in {county.name}?</h3>
                  <ul className="space-y-3">
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span><strong>Convenience:</strong> We come to your home or office - no need to drive anywhere</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span><strong>Time-Saving:</strong> Get your car detailed while you work or relax</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span><strong>Professional Quality:</strong> Hand-washed with premium products and professional-grade equipment</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span><strong>Local Expertise:</strong> We understand the unique challenges of maintaining vehicles in the Piedmont Triad region</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 mb-4">Serving {county.name} Communities</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Whether you're in {county.cities[0]}, {county.cities[1]}, or any other community in {county.name}, our mobile car detailing service is available to bring professional car cleaning directly to you. We understand that your time is valuable, which is why we've made it our mission to make car detailing as convenient as possible.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Our team is familiar with the local area and the specific challenges that come with maintaining vehicles in North Carolina - from spring pollen to winter road salt. We use products and techniques specifically chosen to protect your vehicle from these regional challenges.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-lg border-2 border-primary-100 sticky top-24">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Book Your Service</h3>
                  <p className="text-slate-600 text-sm mb-6">
                    Ready to get your car detailed in {county.name}? Contact us to schedule your mobile detailing service.
                  </p>
                  <div className="space-y-4">
                    <Link
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-xl w-full justify-center"
                      to="/booking"
                    >
                      Book Now
                    </Link>
                    <Link
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-500 border-2 border-primary-500 shadow-md hover:bg-primary-50 hover:-translate-y-0.5 hover:shadow-lg w-full justify-center"
                      to="/contact"
                    >
                      Contact Us
                    </Link>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-slate-500 text-xs mb-2">
                      <strong className="text-slate-800">Service Area</strong>
                    </p>
                    <p className="text-slate-500 text-xs">
                      We serve all of {county.name}, including {county.cities.slice(0, 3).join(', ')}, and surrounding areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-2xl md:text-4xl font-extrabold leading-tight mb-6 text-slate-800 tracking-tight text-center">
              Other Service Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {counties.filter((c) => c.slug !== county.slug).map((c) => (
                <Link
                  key={c.slug}
                  to={`/locations/${c.slug}`}
                  className="bg-white rounded-xl p-6 shadow-md border-2 border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{c.name}</h3>
                  <p className="text-slate-600 text-sm">Car detailing services in {c.cities[0]} and surrounding areas</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/services"
                className="text-primary-500 hover:underline font-semibold"
              >
                View all services →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default CountyPage
