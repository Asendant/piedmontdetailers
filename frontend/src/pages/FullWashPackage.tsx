import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import { servicePackages } from '../data/seed'

const FullWashPackage = () => {
  const pkg = servicePackages.find((p) => p.title === 'Full Wash Package')
  
  if (!pkg) return null

  return (
    <>
      <Helmet>
        <title>Full Car Detailing Service Greensboro NC | Complete Interior & Exterior Detail | Piedmont Detailers</title>
        <meta name="description" content="Complete full car detailing service in Greensboro, Winston-Salem & High Point. Comprehensive interior and exterior cleaning - the most thorough package available. Mobile service - we come to you." />
        <meta name="keywords" content="full car detailing Greensboro NC, complete car detail service, interior and exterior detailing, full service car wash, comprehensive car detailing, mobile full detail" />
        <meta property="og:title" content="Full Car Detailing Service Greensboro NC | Complete Interior & Exterior Detail" />
        <meta property="og:description" content="Complete full car detailing service in Greensboro, Winston-Salem & High Point. Comprehensive interior and exterior cleaning - the most thorough package available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://piedmontdetailers.com/services/full-wash-package" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Full Car Detailing Service Greensboro NC | Piedmont Detailers" />
        <meta name="twitter:description" content="Complete full car detailing service in Greensboro, Winston-Salem & High Point. Comprehensive interior and exterior cleaning." />
        <link rel="canonical" href="https://piedmontdetailers.com/services/full-wash-package" />
      </Helmet>
      <SEO
        title="Full Car Detailing Service Greensboro NC | Complete Interior & Exterior Detail"
        description="Complete full car detailing service in Greensboro, Winston-Salem & High Point. Comprehensive interior and exterior cleaning - the most thorough package available. Mobile service - we come to you."
        keywords="full car detailing Greensboro NC, complete car detail service, interior and exterior detailing, full service car wash, comprehensive car detailing, mobile full detail"
        url="/services/full-wash-package"
      />
      <div className="flex flex-col gap-0">
        <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-primary-700 via-primary-500 via-primary-400 to-sky-300 text-white relative overflow-hidden">
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-white drop-shadow-lg">
              Full Wash Package - Complete Car Detailing
            </h1>
            <p className="text-lg sm:text-base md:text-lg text-white/98 leading-relaxed max-w-3xl">
              Complete inside and outside detailing service. The most comprehensive package that includes everything from both Interior and Exterior packages for a total vehicle refresh.
            </p>
          </div>
        </section>

        <section className="py-20 sm:py-12 md:py-16">
          <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-3xl sm:text-2xl md:text-4xl font-extrabold leading-tight mb-6 text-slate-800 tracking-tight">
                  Complete Vehicle Detailing Service
                </h2>
                <p className="text-lg sm:text-base md:text-lg text-slate-600 leading-relaxed mb-8">
                  Our Full Wash Package is our most comprehensive service, combining everything from our Interior and Exterior packages into one complete vehicle refresh. This is the perfect choice for regular maintenance, before special events, or when you want your entire vehicle to look and feel like new.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 mb-4">What's Included</h3>
                  <p className="text-slate-600 mb-4">
                    This package includes everything from both our Interior and Exterior packages, plus additional attention to detail:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="text-slate-700 text-base sm:text-sm md:text-base flex items-start">
                        <span className="text-primary-500 mr-3 font-bold text-xl flex-shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8 p-6 bg-primary-50 rounded-lg border-2 border-primary-200">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Benefits of the Full Wash Package</h3>
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
                  <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 mb-4">Interior Services Included</h3>
                  <ul className="space-y-2 mb-4">
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Thorough vacuum of all floors, seats, and cargo areas</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Wipe down of all interior surfaces (dashboard, console, door panels)</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Window cleaning (inside and out)</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Trash removal and organization</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Basic interior protection treatment</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 mb-4">Exterior Services Included</h3>
                  <ul className="space-y-2 mb-4">
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Hand wash with pH-balanced car shampoo</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Wheel and tire cleaning</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Thorough rinse and dry with microfiber towels</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Tire shine application</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Basic paint protection spray</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl sm:text-xl md:text-2xl font-bold text-slate-800 mb-4">Why Choose the Full Wash Package?</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The Full Wash Package offers the best value for comprehensive vehicle care. By combining both interior and exterior services, you get a complete vehicle refresh in one convenient appointment. This package is ideal for:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Regular maintenance every 3-4 months</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Preparing your vehicle for special events or trips</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Seasonal deep cleaning (spring pollen removal, winter prep)</span>
                    </li>
                    <li className="text-slate-700 text-base flex items-start">
                      <span className="text-primary-500 mr-2 font-bold">•</span>
                      <span>Maintaining your vehicle's resale value</span>
                    </li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed">
                    We serve customers throughout the Piedmont Triad, including Greensboro, Winston-Salem, High Point, and surrounding areas. Our mobile service brings professional-grade equipment and premium products directly to your location - whether that's your home, office, or anywhere else convenient for you.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-lg border-2 border-primary-100 sticky top-24">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Book Your Full Detail</h3>
                  <p className="text-slate-600 text-sm mb-6">
                    Ready for a complete vehicle refresh? Contact us for a custom quote based on your vehicle size and specific needs.
                  </p>
                  <div className="space-y-4">
                    <Link
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-xl w-full justify-center"
                      to="/booking"
                    >
                      Book Full Wash Package
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
                      <strong className="text-slate-800">Best Value</strong>
                    </p>
                    <p className="text-slate-500 text-xs mb-2">
                      Get both interior and exterior services in one comprehensive package.
                    </p>
                    <p className="text-slate-500 text-xs">
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
                <h3 className="text-xl font-bold text-slate-800 mb-2">Exterior Package</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Professional exterior wash and protection service that keeps your car looking showroom-ready.
                </p>
                <Link
                  to="/services/exterior-package"
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

export default FullWashPackage
