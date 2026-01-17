import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { servicePackages } from '../data/seed'

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
    <SEO
      title="Our Car Cleaning Packages"
      description="Choose from 3 simple packages: Interior, Exterior, or Full Wash. We clean your car at your location."
      keywords="car cleaning, car wash, interior cleaning, exterior cleaning, mobile car detailing, car detailing Greensboro, car detailing Winston-Salem"
      url="/services"
    />
    <div className="flex flex-col gap-0">
    <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-primary-700 via-primary-500 via-primary-400 to-sky-300 text-white relative overflow-hidden">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-white drop-shadow-lg">
          Our Packages
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
              <p className="text-slate-500 leading-relaxed m-0 text-base sm:text-sm md:text-base mb-6">
                {pkg.details}
              </p>
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
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 sm:mb-8 max-w-3xl">
          <h2 className="text-4xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-slate-800 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
            Simple. Easy. Done.
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
