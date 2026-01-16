import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { servicePackages } from '../data/seed'

const addOns = [
  'Engine bay detailing',
  'Headlight restoration',
  'Pet hair removal',
  'Ozone odor treatment',
  'Convertible top conditioning',
]

const processSteps = [
  {
    title: 'Consult',
    description:
      'We evaluate your vehicle, goals, and timeline to recommend the right package.',
  },
  {
    title: 'Detail',
    description:
      'Our team arrives on-site with tools, water, and power ready to go.',
  },
  {
    title: 'Protect',
    description:
      'We finish with a protection plan so your finish stays clean longer.',
  },
]

const Services = () => (
  <>
    <SEO
      title="Detailing Services & Packages"
      description="Interior, exterior, and paint correction services tailored to your vehicle. Choose from Express Wash, Full Detail, Interior Deep Clean, Paint Correction, or Ceramic Coating packages."
      keywords="car detailing services, paint correction, ceramic coating, interior detailing, exterior detailing, mobile detailing packages, car wash services, car detailing Greensboro, car detailing Winston-Salem, car detailing High Point, mobile detailing services NC"
      url="/services"
    />
    <div className="flex flex-col gap-0">
    <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-sky-300/5 pointer-events-none" />
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <p className="uppercase tracking-widest text-xs sm:text-sm text-primary-500 mb-4 font-bold inline-block px-4 py-2 bg-primary-500/10 rounded-full border border-primary-500/20">
          Packages & Pricing Guidance
        </p>
        <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
          Interior, Exterior, and Paint Correction Done Right
        </h1>
        <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-3xl">
          Every service is tailored to your vehicle. We offer clear guidance on
          which package fits your goals and budget, ensuring you get the best value for your investment.
        </p>
      </div>
    </section>

    <section className="py-20 sm:py-12 md:py-16">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-6">
          {servicePackages.map((pkg, index) => (
            <div
              key={pkg.title}
              className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 sm:p-6 md:p-8 shadow-lg border-2 border-primary-100 transition-all duration-400 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-primary-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 scale-x-0 origin-left transition-transform duration-400 hover:scale-x-100" />
              <div className="flex items-center gap-5 mb-4">
                <div className="text-5xl sm:text-4xl md:text-5xl drop-shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-6">
                  {['🚗', '✨', '🧽', '🔧', '🛡️'][index]}
                </div>
                <h3 className="m-0 text-slate-800 text-2xl sm:text-xl md:text-2xl font-bold leading-tight">
                  {pkg.title}
                </h3>
              </div>
              <p className="text-slate-500 leading-relaxed m-0 text-base sm:text-sm md:text-base mb-6">
                {pkg.details}
              </p>
              <div className="grid gap-4 my-2">
                <div className="flex items-center gap-4 text-slate-700 text-base">
                  <span className="text-primary-500 font-extrabold text-xl flex-shrink-0 bg-gradient-to-br from-primary-500 to-primary-400 bg-clip-text text-transparent">
                    ✓
                  </span>
                  <span>Professional-grade products</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700 text-base">
                  <span className="text-primary-500 font-extrabold text-xl flex-shrink-0 bg-gradient-to-br from-primary-500 to-primary-400 bg-clip-text text-transparent">
                    ✓
                  </span>
                  <span>Paint-safe techniques</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700 text-base">
                  <span className="text-primary-500 font-extrabold text-xl flex-shrink-0 bg-gradient-to-br from-primary-500 to-primary-400 bg-clip-text text-transparent">
                    ✓
                  </span>
                  <span>Mobile service included</span>
                </div>
              </div>
              <Link
                className="mt-auto text-primary-500 no-underline font-bold text-base sm:text-sm md:text-base transition-all duration-300 inline-flex items-center gap-2 hover:text-primary-700 hover:gap-3"
                to="/booking"
              >
                Book This Service →
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
            Popular Add-Ons
          </h2>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
            Mix and match to create your perfect detail package.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {addOns.map((item) => (
            <span
              key={item}
              className="bg-gradient-to-br from-blue-100 to-cyan-100 text-primary-700 rounded-full px-5 py-2.5 text-sm font-semibold border border-primary-200 transition-all duration-300 shadow-md hover:from-blue-200 hover:to-cyan-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-primary-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-12 md:py-16">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 sm:mb-8 max-w-3xl">
          <h2 className="text-4xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-slate-800 tracking-tight">
            Our Mobile Detailing Process
          </h2>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
            We keep it simple, professional, and convenient. From consultation to completion, we handle every step.
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
