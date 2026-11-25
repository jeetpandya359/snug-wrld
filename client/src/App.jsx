import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, pageTransition } from './components/animations/motion'
import ScrollProgressButton from './components/layout/ScrollProgressButton'
import SiteFooter from './components/layout/SiteFooter'
import SiteNav from './components/layout/SiteNav'
import RackFlight from './components/product-rack/RackFlight.jsx'
import { useRackFlight } from './components/product-rack/rackFlight.js'
import About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Home from './pages/Home'
import InfoPage from './pages/InfoPage'
import NotFound from './pages/NotFound'
import ProductDetails from './pages/ProductDetails'
import Shop from './pages/Shop'

function AnimatedRoutes() {
  const location = useLocation()
  const flight = useRackFlight()
  const traveling = flight.phase === 'moving'
  const ease = [0.22, 1, 0.36, 1]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={traveling ? { opacity: 0, transition: { duration: 0.18, ease } } : pageTransition.exit}
        transition={traveling ? { duration: 0.45, ease } : pageTransition.transition}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<InfoPage />} />
          <Route path="/shipping" element={<InfoPage />} />
          <Route path="/returns" element={<InfoPage />} />
          <Route path="/privacy" element={<InfoPage />} />
          <Route path="/terms" element={<InfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteNav />
      <AnimatedRoutes />
      <RackFlight />
      <SiteFooter />
      <ScrollProgressButton />
    </BrowserRouter>
  )
}
