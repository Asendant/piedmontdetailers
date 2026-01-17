import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'
import Admin from './pages/Admin'
import Blog from './pages/Blog'
import BookingPage from './pages/Booking'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Services from './pages/Services'
import Terms from './pages/Terms'
import Videos from './pages/Videos'
import InteriorPackage from './pages/InteriorPackage'
import ExteriorPackage from './pages/ExteriorPackage'
import FullWashPackage from './pages/FullWashPackage'
import GuilfordCounty from './pages/locations/GuilfordCounty'
import ForsythCounty from './pages/locations/ForsythCounty'
import DavidsonCounty from './pages/locations/DavidsonCounty'
import RandolphCounty from './pages/locations/RandolphCounty'
import StokesCounty from './pages/locations/StokesCounty'
import SurryCounty from './pages/locations/SurryCounty'
import YadkinCounty from './pages/locations/YadkinCounty'

const App = () => (
  <Layout>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/interior-package" element={<InteriorPackage />} />
      <Route path="/services/exterior-package" element={<ExteriorPackage />} />
      <Route path="/services/full-wash-package" element={<FullWashPackage />} />
      <Route path="/locations/guilford-county" element={<GuilfordCounty />} />
      <Route path="/locations/forsyth-county" element={<ForsythCounty />} />
      <Route path="/locations/davidson-county" element={<DavidsonCounty />} />
      <Route path="/locations/randolph-county" element={<RandolphCounty />} />
      <Route path="/locations/stokes-county" element={<StokesCounty />} />
      <Route path="/locations/surry-county" element={<SurryCounty />} />
      <Route path="/locations/yadkin-county" element={<YadkinCounty />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
)

export default App
