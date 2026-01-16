import { Route, Routes } from 'react-router-dom'
import './App.css'
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
import Services from './pages/Services'
import Videos from './pages/Videos'

const App = () => (
  <Layout>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
)

export default App
