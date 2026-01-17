import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import { servicePackages } from '../data/seed'

const ExteriorPackage = () => {
  const pkg = servicePackages.find((p) => p.title === 'Exterior Package')
  
  if (!pkg) return null

  return (
    <>
      <Helmet>
        <title>Exterior Car Detailing Service Greensboro NC | Hand Wash & Paint Protection | Piedmont Detailers</title>
        <meta name="description" content="Professional exterior car detailing in Greensboro, Winston-Salem & High Point. Hand wash, wheel cleaning, tire shine & paint protection. Mobile service - we come to you." />
        <meta name="keywords" content="exterior car detailing Greensboro NC, hand car wash, exterior car cleaning, mobile car wash service, paint protection service, wheel cleaning service" />
        <meta property="og:title" content="Exterior Car Detailing Service Greensboro NC | Hand Wash & Paint Protection" />
        <meta property="og:description" content="Professional exterior car detailing in Greensboro, Winston-Salem & High Point. Hand wash, wheel cleaning, tire shine & paint protection." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://piedmontdetailers.com/services/exterior-package" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Exterior Car Detailing Service Greensboro NC | Piedmont Detailers" />
        <meta name="twitter:description" content="Professional exterior car detailing in Greensboro, Winston-Salem & High Point. Hand wash and paint protection service." />
        <link rel="canonical" href="https://piedmontdetailers.com/services/exterior-package" />
      </Helmet>
      <SEO
        title="Exterior Car Detailing Service Greensboro NC | Hand Wash & Paint Protection"
        description="Professional exterior car detailing in Greensboro, Winston-Salem & High Point. Hand wash, wheel cleaning, tire shine & paint protection. Mobile service - we come to you."
        keywords="exterior car detailing Greensboro NC, hand car wash, exterior car cleaning, mobile car wash service, paint protection service, wheel cleaning service"
        url="/services/exterior-package"
      />
      <div className="flex flex-col gap-0">
        <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-primary-700 via-primary-500 via-primary-400 to-sky-300 text-white relative overflow-hidden">
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-white drop-shadow-lg">
              Exterior Car Detailing Service
            </h1>
            <p className="text-lg sm:text-base md:text-lg text-white/98 leading-relaxed max-w-3xl">
              Professional exterior wash and protection service that keeps your car looking showroom-ready. Hand-washed with premium products to protect your paint.
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-12 md:py-16">
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-3xl sm:text-2xl md:text-4xl font-extrabold leading-tight mb-6 text-slate-800 tracking-tight">
                  What's Included in Our Exterior Detailing Package
                </h2>
                <p className="text-lg sm:text-base md:text-lg text-slate-600 leading-relaxed mb-8">
                  Our Exterior Package provides comprehensive cleaning and protection for your vehicle's exterior surfaces. Unlike automated car washes that can scratch your paint, we use hand-washing techniques with premium products to ensure your vehicle looks its best while being protected from the elements.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 mb-4">Service Details</h3>
                  <ul className="space-y-3 mb-6">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="text-slate-700 text-base sm:text-sm md:text-base flex items-start">
                        <span className="text-primary-500 mr-3 font-bold text-xl flex-shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.notIncludes && pkg.notIncludes.length > 0 && (
                  <div className="mb-8 p-4 bg-slate-50 rounded-lg border-l-4 border-slate-300">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Not Included in This Package</h3>
                    <ul className="space-y-2">
                      {pkg.notIncludes.map((item, idx) => (
                        <li key={idx} className="text-slate-600 text-sm flex items-start">
                          <span className="text-slate-400 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-slate-500 mt-3">
                      Need these services? Consider our <Link to="/services/full-wash-package" className="text-primary-500 hover:underline font-semibold">Full Wash Package</Link> or <Link to="/contact" className="text-primary-500 hover:underline font-semibold">contact us</Link> for custom options.
                    </p>
                  </div>
                )}

                <div className="mb-8 p-6 bg-primary-50 rounded-lg border-2 border-primary-200">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Benefits of Regular Exterior Detailing</h3>
                  <ul className="space-y-2">
                    {pkg.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-slate-700 text-base flex items-start">
                        <span className="text-primary-500 mr-2 font-bold">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 mb-4">Why Choose Our Exterior Detailing Service?</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Our exterior detailing service uses hand-washing techniques that are gentle on your paint while effectively removing dirt, grime, and contaminants. We use pH-balanced car shampoo that won't strip your wax or damage your clear coat. Every vehicle receives individual attention to ensure the best possible results.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The Piedmont Triad region experiences varying weather conditions throughout the year - from pollen in spring to road salt in winter. Regular exterior detailing helps protect your investment by removing harmful contaminants and applying protective treatments that shield your paint from UV damage, oxidation, and environmental hazards.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    We serve customers throughout Greensboro, Winston-Salem, High Point, and surrounding areas. Our mobile service means we bring professional-grade equipment and premium products directly to your location. No need to drive anywhere - we come to you at home or work.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-lg border-2 border-primary-100 sticky top-24">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Book Your Exterior Detail</h3>
                  <p className="text-slate-600 text-sm mb-6">
                    Ready to make your car shine? Contact us for a custom quote based on your vehicle size and specific needs.
                  </p>
                  <div className="space-y-4">
                    <Link
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-xl w-full justify-center"
                      to="/booking"
                    >
                      Book Exterior Package
                    </Link>
                    <Link
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-500 border-2 border-primary-500 shadow-md hover:bg-primary-50 hover:-translate-y-0.5 hover:shadow-lg w-full justify-center"
                      to="/contact"
                    >
                      Get Custom Quote
                    </Link>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-slate-500 text-xs mb-2">
                      <strong className="text-slate-800">Transparent Pricing</strong>
                    </p>
                    <p className="text-slate-500 text-xs">
                      No hidden fees. We'll provide a detailed quote before you book.
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
              Other Service Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Interior Package</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Complete interior cleaning service that removes dirt, dust, and debris from inside your vehicle.
                </p>
                <Link
                  to="/services/interior-package"
                  className="text-primary-500 hover:underline font-semibold text-sm"
                >
                  Learn more →
                </Link>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Full Wash Package</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Complete inside and outside detailing service - the most comprehensive package available.
                </p>
                <Link
                  to="/services/full-wash-package"
                  className="text-primary-500 hover:underline font-semibold text-sm"
                >
                  Learn more →
                </Link>
              </div>
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

export default ExteriorPackage
