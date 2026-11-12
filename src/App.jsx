import useLenis from './lib/useLenis'
import Loader from './components/Loader'
import Hero from './components/Hero'
import BestSellers from './components/BestSellers'
import AboutUs from './components/AboutUs'
import OfferGallery from './components/OfferGallery'
import MoodSelector from './components/MoodSelector'
import Testimonial from './components/Testimonial'
import Reviews from './components/Reviews'
import PromoOffers from './components/PromoOffers'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ProductModal from './components/ProductModal'
import { CartProvider, useCart } from './context/CartContext'

const AppContent = () => {
  useLenis()
  const { toastMessage } = useCart()

  return (
    <>
      <Loader />
      <Hero />
      <BestSellers />
      <AboutUs />
      <OfferGallery />
      <MoodSelector />
      <Testimonial />
      <Reviews />
      <PromoOffers />
      <Footer />
      <CartDrawer />
      <ProductModal />

      {/* Cart toast notification */}
      {toastMessage && (
        <div className="cart-toast" role="status" aria-live="polite">
          <span className="cart-toast-icon">🌿</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App
