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
    <div className="page">
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">Packages & Pricing Guidance</p>
        <h1>Interior, Exterior, and Paint Correction Done Right</h1>
        <p>
          Every service is tailored to your vehicle. We offer clear guidance on
          which package fits your goals and budget, ensuring you get the best value for your investment.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="services-grid">
          {servicePackages.map((pkg, index) => (
            <div key={pkg.title} className="service-package-card">
              <div className="service-header">
                <div className="service-icon">{['🚗', '✨', '🧽', '🔧', '🛡️'][index]}</div>
                <h3>{pkg.title}</h3>
              </div>
              <p className="service-description">{pkg.details}</p>
              <div className="service-features">
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span>Professional-grade products</span>
                </div>
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span>Paint-safe techniques</span>
                </div>
                <div className="feature-item">
                  <span className="feature-check">✓</span>
                  <span>Mobile service included</span>
                </div>
              </div>
              <Link className="service-cta" to="/booking">
                Book This Service →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section alt">
      <div className="container">
        <div className="section-heading">
          <h2>Popular Add-Ons</h2>
          <p>Mix and match to create your perfect detail package.</p>
        </div>
        <div className="tag-grid">
          {addOns.map((item) => (
            <span key={item} className="tag">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-heading">
          <h2>Our Mobile Detailing Process</h2>
          <p>We keep it simple, professional, and convenient. From consultation to completion, we handle every step.</p>
        </div>
        <div className="grid process-grid">
          {processSteps.map((step) => (
            <div key={step.title} className="card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
  </>
)

export default Services
