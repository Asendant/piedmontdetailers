import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

const Terms = () => (
  <>
    <Helmet>
      <title>Terms of Service | Piedmont Detailers | Piedmont Detailers</title>
      <meta name="description" content="Terms of service for Piedmont Detailers mobile car detailing services in the Piedmont Triad." />
      <meta property="og:title" content="Terms of Service | Piedmont Detailers" />
      <meta property="og:description" content="Terms of service for Piedmont Detailers mobile car detailing services in the Piedmont Triad." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://piedmontdetailers.com/terms" />
      <link rel="canonical" href="https://piedmontdetailers.com/terms" />
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <SEO
      title="Terms of Service | Piedmont Detailers"
      description="Terms of service for Piedmont Detailers mobile car detailing services in the Piedmont Triad."
      url="/terms"
    />
    <div className="flex flex-col gap-0">
      <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-500 mb-8">Last updated: January 2026</p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Service Agreement</h2>
            <p className="text-slate-600 mb-4">
              By booking a service with Piedmont Detailers, you agree to provide accurate information about your vehicle and service location. We reserve the right to refuse service if conditions are unsafe or if the vehicle is in an unacceptable condition.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Payment Terms</h2>
            <p className="text-slate-600 mb-4">
              Payment is due upon completion of service. We accept cash, credit cards, and digital payment methods. Quotes are estimates and final pricing may vary based on vehicle size and condition.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Cancellation Policy</h2>
            <p className="text-slate-600 mb-4">
              Please provide at least 24 hours notice for cancellations. Same-day cancellations may be subject to a cancellation fee.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Liability</h2>
            <p className="text-slate-600 mb-4">
              Piedmont Detailers is fully insured. We are not responsible for pre-existing damage to your vehicle. Please inspect your vehicle before and after service.
            </p>
          </div>
        </div>
      </section>
    </div>
  </>
)

export default Terms
