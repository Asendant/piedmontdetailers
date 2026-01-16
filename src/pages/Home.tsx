import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { serviceAreas, servicePackages } from '../data/seed'

const highlights = [
  { label: 'Counties Served', value: '7+' },
  { label: 'Mobile Service', value: '100%' },
  { label: 'Detail Levels', value: '5' },
]

const Home = () => (
  <>
    <SEO
      title="Mobile Car Detailing in the Piedmont Triad"
      description="Showroom shine without leaving your driveway. Piedmont Detailers brings premium mobile car detailing services to every county in the Piedmont Triad. From quick washes to ceramic coating, we tailor each detail to your vehicle."
      keywords="mobile car detailing, Piedmont Triad, mobile detailer, car wash, paint correction, ceramic coating, Greensboro car detailing, Winston-Salem car detailing, High Point car detailing, mobile auto detailing, car detailing near me, mobile detailer Piedmont Triad, professional car detailing NC"
      url="/"
    />
    <div className="flex flex-col gap-0">
    <section className="bg-gradient-to-br from-primary-700 via-primary-500 via-primary-400 to-sky-300 text-white py-24 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/8 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/3 pointer-events-none" />
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 md:gap-8 lg:grid-cols-2 items-center">
          <div>
            <p className="uppercase tracking-widest text-xs sm:text-sm text-white/95 mb-4 font-bold inline-block px-4 py-2 bg-white/15 rounded-full backdrop-blur-sm border border-white/20">
              Mobile Detailing Across the Triad
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight text-white drop-shadow-lg">
              Showroom Shine Without Leaving Your Driveway
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/98 mb-8 leading-relaxed font-normal max-w-2xl">
              Piedmont Detailers brings premium exterior and interior services to
              every county in the Piedmont Triad. From quick washes to ceramic
              coating, we tailor each detail to your vehicle.
            </p>
            <div className="flex flex-wrap gap-5 mb-12">
              <Link
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl"
                to="/contact"
              >
                Book Your Detail
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white/15 text-white border-2 border-white/40 backdrop-blur-sm hover:bg-white/25 hover:border-white/60 hover:-translate-y-0.5 hover:shadow-lg"
                to="/services"
              >
                View Services
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="bg-white/20 rounded-2xl p-6 sm:p-4 backdrop-blur-xl border border-white/30 transition-all duration-300 relative overflow-hidden hover:bg-white/30 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <p className="text-3xl sm:text-4xl font-extrabold m-0 bg-gradient-to-br from-white to-white/90 bg-clip-text text-transparent leading-none">
                    {item.value}
                  </p>
                  <p className="mt-2 sm:mt-1.5 text-white/95 text-sm sm:text-xs font-medium tracking-wide">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/98 text-white p-10 sm:p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl border-2 border-slate-200 backdrop-blur-xl relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-3xl hover:border-primary-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300" />
            <h3 className="text-3xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">
              Signature Care
            </h3>
            <p className="text-white/95 leading-relaxed mb-6 text-base sm:text-sm md:text-base">
              We use professional-grade products, paint-safe wash methods, and
              meticulous interior detailing to keep your ride protected.
            </p>
            <ul className="list-none p-0 m-0 grid gap-3">
              <li className="flex items-start text-white/95 leading-relaxed text-base sm:text-sm md:text-base">
                <span className="text-white mr-3 font-extrabold text-xl flex-shrink-0 mt-0.5">
                  ✓
                </span>
                On-site mobile service with water & power
              </li>
              <li className="flex items-start text-white/95 leading-relaxed text-base sm:text-sm md:text-base">
                <span className="text-white mr-3 font-extrabold text-xl flex-shrink-0 mt-0.5">
                  ✓
                </span>
                Licensed, insured, and locally trusted
              </li>
              <li className="flex items-start text-white/95 leading-relaxed text-base sm:text-sm md:text-base">
                <span className="text-white mr-3 font-extrabold text-xl flex-shrink-0 mt-0.5">
                  ✓
                </span>
                Flexible scheduling for homes and offices
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
            Detail Packages Built Around Your Goals
          </h2>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
            Choose a quick refresh or a full transformation. Every package is
            customized for your vehicle's needs.
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
                {pkg.title}
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
            Serving Every Corner of the Piedmont Triad
          </h2>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
            We travel to homes, offices, and dealerships throughout the region.
            Our mobile service brings professional detailing directly to you.
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
              Ready for a Fresh Detail?
            </h2>
            <p className="text-xl sm:text-lg md:text-xl leading-relaxed text-white/95 max-w-2xl">
              Get a customized quote and let our team handle the shine. Same-week
              appointments available throughout the Piedmont Triad.
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
  </div>
  </>
)

export default Home
