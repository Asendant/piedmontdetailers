import type { RouteObject } from 'react-router-dom'
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

export const routes: RouteObject[] = [
  {
    path: '/',
    element: Home({}),
  },
  {
    path: '/services',
    element: Services({}),
  },
  {
    path: '/gallery',
    element: Gallery({}),
  },
  {
    path: '/blog',
    element: Blog({}),
  },
  {
    path: '/videos',
    element: Videos({}),
  },
  {
    path: '/about',
    element: About({}),
  },
  {
    path: '/contact',
    element: Contact({}),
  },
  {
    path: '/booking',
    element: BookingPage({}),
  },
  {
    path: '/admin',
    element: Admin({}),
  },
  {
    path: '*',
    element: NotFound({}),
  },
]
