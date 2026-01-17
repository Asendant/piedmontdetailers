import SEO from '../components/SEO'

const About = () => (
  <>
    <SEO
      title="About Us"
      description="We're a local team that cleans cars. We come to you with everything we need. Simple service, good results."
      keywords="about piedmont detailers, mobile car cleaning, local detailer, Piedmont Triad"
      url="/about"
    />
    <div className="flex flex-col gap-0">
    <section className="bg-gradient-to-br from-primary-700 via-primary-500 via-primary-400 to-sky-300 text-white py-24 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/8 pointer-events-none" />
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight my-6 tracking-tight text-white drop-shadow-lg">
              About Us
            </h1>
            <p className="text-xl sm:text-lg md:text-xl leading-relaxed my-8 text-white/98 font-normal">
              We're a local team that cleans cars. We come to you, bring everything we need, and make your car look great.
            </p>
            <p className="text-white/95 leading-relaxed my-6 text-lg sm:text-base md:text-lg">
              Simple service. No complicated options. Just pick a package, book a time, and we'll take care of the rest.
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
              We Do Good Work
            </h3>
            <p className="text-slate-500 leading-relaxed text-base sm:text-sm md:text-base m-0">
              We clean your car properly. We use good products and take our time to do it right.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-12 sm:p-8 md:p-10 shadow-lg border-2 border-transparent text-center transition-all duration-400 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-primary-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 scale-x-0 origin-left transition-transform duration-400 hover:scale-x-100" />
            <div className="text-6xl sm:text-5xl md:text-6xl mb-6 drop-shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-6">
              🚐
            </div>
            <h3 className="text-slate-800 my-6 text-2xl sm:text-xl md:text-2xl font-bold">
              We Come to You
            </h3>
            <p className="text-slate-500 leading-relaxed text-base sm:text-sm md:text-base m-0">
              We bring everything we need. You don't have to go anywhere. We show up, clean your car, and leave.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-12 sm:p-8 md:p-10 shadow-lg border-2 border-transparent text-center transition-all duration-400 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-primary-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-sky-300 scale-x-0 origin-left transition-transform duration-400 hover:scale-x-100" />
            <div className="text-6xl sm:text-5xl md:text-6xl mb-6 drop-shadow-md transition-transform duration-300 hover:scale-110 hover:rotate-6">
              ❤️
            </div>
            <h3 className="text-slate-800 my-6 text-2xl sm:text-xl md:text-2xl font-bold">
              We Care
            </h3>
            <p className="text-slate-500 leading-relaxed text-base sm:text-sm md:text-base m-0">
              We treat your car like it's our own. We want you to be happy with the results.
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
              Why Choose Us
            </h2>
            <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed font-normal">
              Simple packages. Easy booking. Good results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6">
            {[
              { num: '01', title: 'Simple Pricing', desc: 'Three clear packages. No hidden fees. You know what you\'re getting.' },
              { num: '02', title: 'We Show Up', desc: 'We\'re reliable. When we say we\'ll be there, we\'ll be there.' },
              { num: '03', title: 'Flexible Times', desc: "We work around your schedule. Morning, afternoon, or evening - we'll find a time that works." },
              { num: '04', title: 'Fully Insured', desc: 'We\'re a real business. Insured, and ready to help.' },
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
