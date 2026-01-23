import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

const Privacy = () => (
  <>
    <Helmet>
      <title>Privacy Policy | Piedmont Detailers | Piedmont Detailers</title>
      <meta name="description" content="Privacy policy for Piedmont Detailers. Learn how we collect, use, and protect your personal information." />
      <meta property="og:title" content="Privacy Policy | Piedmont Detailers" />
      <meta property="og:description" content="Privacy policy for Piedmont Detailers. Learn how we collect, use, and protect your personal information." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://piedmontdetailers.com/privacy" />
      <link rel="canonical" href="https://piedmontdetailers.com/privacy" />
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <SEO
      title="Privacy Policy | Piedmont Detailers"
      description="Privacy policy for Piedmont Detailers. Learn how we collect, use, and protect your personal information."
      url="/privacy"
    />
    <div className="flex flex-col gap-0">
      <section className="py-20 sm:py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight text-slate-800">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-500 mb-8">Last updated: January 2026</p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              We collect information you provide directly to us, including your name, phone number, email address, vehicle information, and service location when you book a service or contact us.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-slate-600 mb-4">
              We use your information to provide our mobile car detailing services, communicate with you about your bookings, send service confirmations, and respond to your inquiries.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Information Sharing</h2>
            <p className="text-slate-600 mb-4">
              We do not sell or share your personal information with third parties except as necessary to provide our services or as required by law.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have questions about this privacy policy, please contact us at{' '}
              <a href="mailto:business@piedmontdetailers.com" className="text-primary-600 hover:underline">
                business@piedmontdetailers.com
              </a> or call (336) 310-9061.
            </p>
          </div>
        </div>
      </section>
    </div>
  </>
)

export default Privacy
