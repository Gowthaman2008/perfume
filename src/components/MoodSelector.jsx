import { useEffect, useRef, useState } from 'react'
import { FaHeart, FaFire, FaGem, FaLeaf, FaCompass, FaCrown, FaBolt } from 'react-icons/fa'
import { products, individualPodis } from '../data/products'
import { useCart } from '../context/CartContext'
import './MoodSelector.css'

const WELLNESS_GOALS = [
  {
    title: 'Blood Sugar & Metabolism',
    description: 'Control sugar spikes & stimulate metabolic burn',
    productName: 'Thenee Herbal Tea',
    productId: 'herbal-tea',
    image: '/images/custom_thenee/herbal-tea-product.jpg',
    icon: <FaLeaf size={20} className="mood-icon-svg" />,
    badge: 'Daily Tea Blend',
  },
  {
    title: 'Calm & Deep Sleep',
    description: '100% caffeine-free butterfly pea & hibiscus floral bliss',
    productName: 'Thenee Bliss Tea',
    productId: 'bliss-tea',
    image: '/images/custom_thenee/bliss-tea-product.jpg',
    icon: <FaHeart size={20} className="mood-icon-svg" />,
    badge: 'Floral Infusion',
  },
  {
    title: 'Stamina & Plant Nutrients',
    description: 'Natural vitamins, minerals & non-crash vitality',
    productName: 'Pure Moringa Powder',
    productId: 'moringa-powder',
    image: '/images/custom_thenee/moringa-powder-product.jpg',
    icon: <FaBolt size={20} className="mood-icon-svg" />,
    badge: 'Village Superfood',
  },
  {
    title: 'Gut Health & Immunity',
    description: 'Savory allicin antioxidants for soothing digestion',
    productName: 'Garlic Powder (Poondu)',
    productId: 'garlic-podi',
    image: '/images/custom_thenee/garlic-podi.jpg',
    icon: <FaFire size={20} className="mood-icon-svg" />,
    badge: 'Traditional Podi',
  },
  {
    title: 'Hair Growth & Eyesight',
    description: 'Iron & Vitamin A powerhouse for thick hair roots',
    productName: 'Curry Leaves Powder',
    productId: 'curry-leaves-podi',
    image: '/images/custom_thenee/curry-leaves-podi.jpg',
    icon: <FaGem size={20} className="mood-icon-svg" />,
    badge: 'Traditional Podi',
  },
  {
    title: 'Bone Strength & Heart',
    description: 'Healthy fats & dietary calcium from roasted sesame',
    productName: 'Sesame Powder (Ellu)',
    productId: 'sesame-podi',
    image: '/images/custom_thenee/sesame-podi.jpg',
    icon: <FaCrown size={20} className="mood-icon-svg" />,
    badge: 'Traditional Podi',
  },
  {
    title: 'Heat Balance & Detox',
    description: 'Cooling village greens to balance internal body heat',
    productName: 'Moringa Leaves Podi',
    productId: 'moringa-podi',
    image: '/images/custom_thenee/moringa-podi.jpg',
    icon: <FaCompass size={20} className="mood-icon-svg" />,
    badge: 'Traditional Podi',
  },
]

const MoodSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedIndexes, setAnimatedIndexes] = useState([])
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)
  const { addToCart, openCart, setSelectedProduct } = useCart()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            setInView(true)
            WELLNESS_GOALS.forEach((_, i) => {
              setTimeout(() => {
                setAnimatedIndexes((prev) => [...prev, i])
              }, 130 * i)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const currentGoal = WELLNESS_GOALS[activeIndex]
  const matchedProduct =
    products.find((p) => p.id === currentGoal.productId) ||
    individualPodis.find((p) => p.id === currentGoal.productId)

  return (
    <section className={`mood-selector ${inView ? 'is-in-view' : ''}`} id="wellness" ref={sectionRef}>
      <svg
        className="mood-selector-top-wave"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          fill="#F2F5ED"
        />
      </svg>

      <div className="mood-selector-header">
        <span className="mood-selector-kicker">Targeted Botanical Healing</span>
        <h2>Find Your Daily Health Goal</h2>
        <p>Explore traditional Tamil remedies handcrafted by rural women for holistic wellness.</p>
      </div>

      <div className="mood-options">
        {WELLNESS_GOALS.map((goal, index) => {
          const isActive = activeIndex === index
          return (
            <div
              key={goal.title}
              className={`mood-option ${isActive ? 'is-active' : ''}`}
              style={{
                backgroundImage: `url('${goal.image}')`,
                backgroundSize: isActive ? 'cover' : 'auto 120%',
                opacity: animatedIndexes.includes(index) ? 1 : 0,
                transform: animatedIndexes.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                flex: isActive ? '7 1 0%' : '1 1 0%',
              }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="mood-option-shadow" />
              <div className="mood-option-label">
                <span className="mood-option-icon">{goal.icon}</span>
                <div className="mood-option-info">
                  <div className="mood-option-badge">{goal.badge}</div>
                  <div className="mood-option-title">{goal.title}</div>
                  <div className="mood-option-sub">{goal.description}</div>
                  {isActive && matchedProduct && (
                    <div className="mood-option-action-row">
                      <button
                        className="mood-option-btn-add"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(matchedProduct)
                          openCart()
                        }}
                      >
                        Add {matchedProduct.name} (₹{matchedProduct.price})
                      </button>
                      <button
                        className="mood-option-btn-view"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProduct(matchedProduct)
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default MoodSelector
