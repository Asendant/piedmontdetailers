import SEO from '../components/SEO'

const About = () => (
  <>
    <SEO
      title="About Piedmont Detailers"
      description="Locally owned mobile detailing team serving the Piedmont Triad. We bring professional-grade equipment and expertise directly to your location with craftsmanship, convenience, and care."
      keywords="about piedmont detailers, mobile detailing team, professional car detailing, local detailer, Piedmont Triad detailing"
      url="/about"
    />
    <div className="flex flex-col gap-0">
    <section className="bg-gradient-to-br from-primary-700 via-primary-500 via-primary-400 to-sky-300 text-white py-24 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/8 pointer-events-none" />
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div>
            <p className="uppercase tracking-widest text-xs sm:text-sm text-white/95 mb-4 font-bold inline-block px-4 py-2 bg-white/15 rounded-full backdrop-blur-sm border border-white/20">
              Our Story
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight my-6 tracking-tight text-white drop-shadow-lg">
              Detailing Built for the Piedmont Triad
            </h1>
            <p className="text-xl sm:text-lg md:text-xl leading-relaxed my-8 text-white/98 font-normal">
              Piedmont Detailers is a locally owned mobile detailing team serving
              drivers who want showroom-quality results without the hassle. We bring professional-grade equipment and expertise directly to your location.
            </p>
            <p className="text-white/95 leading-relaxed my-6 text-lg sm:text-base md:text-lg">
              Founded with a passion for automotive excellence, we've built our reputation on attention to detail,
              reliable service, and genuine care for every vehicle we touch. Whether you drive a daily commuter or
              a weekend show car, we treat each detail with the same level of professionalism and precision.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-12 md:py-16">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-6">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-12 sm:p-8 md:p-10 shadow-lg border-2 border-transparent text-center transition-all duration-400 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-primary-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 scale-x-0 origin-left transition-transform duration-400 hover:scale-x-100" />
            <div className="text-6xl sm:text-5xl md:text-6xl mb-6 drop-shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-6">
              🎯
            </div>
            <h3 className="text-slate-800 my-6 text-2xl sm:text-xl md:text-2xl font-bold">
              Craftsmanship
            </h3>
            <p className="text-slate-500 leading-relaxed text-base sm:text-sm md:text-base m-0">
              Every detail is performed with paint-safe techniques and premium tools.
              We stay current with industry best practices and invest in professional-grade equipment
              to ensure your vehicle receives the highest quality care.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-12 sm:p-8 md:p-10 shadow-lg border-2 border-transparent text-center transition-all duration-400 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-primary-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 scale-x-0 origin-left transition-transform duration-400 hover:scale-x-100" />
            <div className="text-6xl sm:text-5xl md:text-6xl mb-6 drop-shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-6">
              🚐
            </div>
            <h3 className="text-slate-800 my-6 text-2xl sm:text-xl md:text-2xl font-bold">
              Convenience
            </h3>
            <p className="text-slate-500 leading-relaxed text-base sm:text-sm md:text-base m-0">
              We bring water, power, and supplies to your location across the Triad.
              No need to disrupt your day or drive to a shop. Our fully-equipped mobile unit
              arrives ready to work, saving you time and hassle.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-12 sm:p-8 md:p-10 shadow-lg border-2 border-transparent text-center transition-all duration-400 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-primary-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 scale-x-0 origin-left transition-transform duration-400 hover:scale-x-100" />
            <div className="text-6xl sm:text-5xl md:text-6xl mb-6 drop-shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-6">
              ❤️
            </div>
            <h3 className="text-slate-800 my-6 text-2xl sm:text-xl md:text-2xl font-bold">
              Care
            </h3>
            <p className="text-slate-500 leading-relaxed text-base sm:text-sm md:text-base m-0">
              We treat every vehicle like our own with a focus on long-term protection.
              Our goal isn't just a clean car today, but maintaining your vehicle's value
              and appearance for years to come.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-14 sm:mb-8 max-w-3xl">
            <h2 className="text-4xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-slate-800 tracking-tight">
              Why Clients Choose Us
            </h2>
            <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
              We keep communication clear and show up prepared to deliver
              consistent, professional results every time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6">
            {[
              { num: '01', title: 'Transparent & Honest', desc: 'Clear recommendations and honest pricing with no hidden fees. We explain what your vehicle needs and why.' },
              { num: '02', title: 'Expert Training', desc: 'Detailers trained in paint correction, ceramic coatings, and advanced techniques. Continuous education keeps us at the forefront.' },
              { num: '03', title: 'Flexible Scheduling', desc: "We work around your schedule, whether that's early mornings, evenings, or weekends. Homes, offices, and dealerships welcome." },
              { num: '04', title: 'Licensed & Insured', desc: 'Fully licensed, bonded, and insured for your peace of mind. We take our business and your vehicle seriously.' },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-10 sm:p-7 md:p-8 shadow-md border-2 border-transparent transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:translate-x-1 hover:shadow-xl hover:border-primary-200"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-primary-400 scale-y-0 origin-top transition-transform duration-300 hover:scale-y-100" />
                <div className="inline-flex items-center justify-center bg-gradient-to-br from-primary-700 to-primary-500 text-white w-14 h-14 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full font-extrabold text-xl sm:text-lg md:text-xl mb-6 shadow-lg border-4 border-white/80 transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-2xl">
                  {item.num}
                </div>
                <h4 className="text-slate-800 my-3 text-xl sm:text-lg md:text-xl font-bold">
                  {item.title}
                </h4>
                <p className="text-slate-500 leading-relaxed my-3 text-base sm:text-sm md:text-base m-0">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
  </>
)

export default About
