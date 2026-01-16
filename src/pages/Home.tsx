import { Link } from 'react-router-dom'
import { serviceAreas, servicePackages } from '../data/seed'

const highlights = [
  { label: 'Counties Served', value: '7+' },
  { label: 'Mobile Service', value: '100%' },
  { label: 'Detail Levels', value: '5' },
]

const Home = () => (
  <div className="page">
    <section className="hero">
      <div className="container hero-content">
        <div>
          <p className="eyebrow">Mobile Detailing Across the Triad</p>
          <h1>Showroom Shine Without Leaving Your Driveway</h1>
          <p className="hero-subtitle">
            Piedmont Detailers brings premium exterior and interior services to
            every county in the Piedmont Triad. From quick washes to ceramic
            coating, we tailor each detail to your vehicle.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/contact">
              Book Your Detail
            </Link>
            <Link className="btn btn-secondary" to="/services">
              View Services
            </Link>
          </div>
          <div className="hero-stats">
            {highlights.map((item) => (
              <div key={item.label} className="stat-card">
                <p className="stat-value">{item.value}</p>
                <p className="stat-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-card">
          <h3>Signature Care</h3>
          <p>
            We use professional-grade products, paint-safe wash methods, and
            meticulous interior detailing to keep your ride protected.
          </p>
          <ul className="checklist">
            <li>On-site mobile service with water & power</li>
            <li>Licensed, insured, and locally trusted</li>
            <li>Flexible scheduling for homes and offices</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-heading">
          <h2>Detail Packages Built Around Your Goals</h2>
          <p>
            Choose a quick refresh or a full transformation. Every package is
            customized for your vehicle’s needs.
          </p>
        </div>
        <div className="packages-showcase">
          {servicePackages.map((pkg, index) => (
            <div key={pkg.title} className="package-card">
              <div className="package-number">{String(index + 1).padStart(2, '0')}</div>
              <h3>{pkg.title}</h3>
              <p>{pkg.details}</p>
              <Link className="package-link" to="/services">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section alt">
      <div className="container">
        <div className="section-heading">
          <h2>Serving Every Corner of the Piedmont Triad</h2>
          <p>
            We travel to homes, offices, and dealerships throughout the region.
            Our mobile service brings professional detailing directly to you.
          </p>
        </div>
        <div className="service-areas-grid">
          {serviceAreas.map((area) => (
            <div key={area} className="service-area-card">
              <div className="area-icon">📍</div>
              <span className="area-name">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container cta">
        <div>
          <h2>Ready for a Fresh Detail?</h2>
          <p>
            Get a customized quote and let our team handle the shine. Same-week
            appointments available throughout the Piedmont Triad.
          </p>
        </div>
        <div className="cta-actions">
          <a className="btn btn-primary" href="tel:+13365550123">
            Call Now
          </a>
          <Link className="btn btn-secondary" to="/booking">
            Book Online
          </Link>
        </div>
      </div>
    </section>
  </div>
)

export default Home
