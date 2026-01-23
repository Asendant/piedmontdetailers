import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="flex flex-col gap-0">
    <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-sky-300/5 pointer-events-none" />
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
          Page Not Found
        </h1>
        <p className="text-lg sm:text-base md:text-lg text-slate-500 leading-relaxed max-w-3xl mb-8">
          Let's get you back to the main site.
        </p>
        <Link
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base cursor-pointer no-underline transition-all duration-300 relative overflow-hidden bg-white text-primary-700 shadow-lg hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-xl"
          to="/"
        >
          Return Home
        </Link>
      </div>
    </section>
  </div>
)

export default NotFound
