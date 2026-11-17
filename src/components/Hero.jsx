import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar'
import OfferMarquee from './OfferMarquee'
import { products, brandInfo } from '../data/products'
import { useCart } from '../context/CartContext'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const BG_TRANSITION = { duration: 0.6, ease: 'easeInOut' }

const Hero = ({ onOpenAccount }) => {
  const [index, setIndex] = useState(0)
  const heroRef = useRef(null)
  const bottleFlyRefs = useRef({})
  const len = products.length
  const current = products[index]
  const { addToCart, setSelectedProduct, openCart } = useCart()

  const prev = () => setIndex((index - 1 + len) % len)
  const next = () => setIndex((index + 1) % len)

  // Flies the currently active bottle down out of the hero and into its
  // matching card slot as the user scrolls
  useLayoutEffect(() => {
    const flyEl = bottleFlyRefs.current[current.id]
    const cardImg = document.querySelector(
      `.bs-card-img[data-perfume-id="${current.id}"]`
    )
    const card = cardImg?.closest('.bs-card')
    if (!flyEl || !cardImg || !card) return

    document.querySelectorAll('.bs-card-img').forEach((img) => {
      img.style.opacity = ''
    })
    cardImg.style.opacity = '0'

    let ctx
    let cancelled = false
    const ready = Promise.all([
      new Promise((resolve) => setTimeout(resolve, 650)),
      document.fonts?.ready ?? Promise.resolve(),
    ])

    ready.then(() => {
      if (cancelled) return
      ctx = gsap.context(() => {
        const dstRect = cardImg.getBoundingClientRect()
        const srcRect = flyEl.querySelector('.hero-bottle-img').getBoundingClientRect()
        const flyElRect = flyEl.getBoundingClientRect()
        const srcCx = srcRect.left + srcRect.width / 2
        const srcCy = srcRect.top + srcRect.height / 2
        const dstCx = dstRect.left + dstRect.width / 2
        const dstCy = dstRect.top + dstRect.height / 2
        const wCx = flyElRect.left + flyElRect.width / 2
        const wCy = flyElRect.top + flyElRect.height / 2
        const scale = dstRect.width / srcRect.width

        gsap.set(flyEl, { zIndex: 300, opacity: 1 })

        const x = dstCx - wCx - scale * (srcCx - wCx)
        const y = dstCy - wCy - scale * (srcCy - wCy)

        gsap.to(flyEl, {
          x,
          y,
          scale,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            endTrigger: card,
            end: 'top 140px',
            scrub: true,
            onUpdate: (self) => {
              heroRef.current.style.zIndex = self.progress > 0 && self.progress < 1 ? 25 : ''
            },
            onLeave: () => {
              cardImg.style.opacity = '1'
              flyEl.style.opacity = '0'
              heroRef.current.style.zIndex = ''
            },
            onEnterBack: () => {
              cardImg.style.opacity = '0'
              flyEl.style.opacity = '1'
            },
          },
        })
      }, heroRef)
    })

    return () => {
      cancelled = true
      ctx?.revert()
      cardImg.style.opacity = ''
      flyEl.style.opacity = ''
      heroRef.current.style.zIndex = ''
      gsap.set(flyEl, { zIndex: '', x: 0, y: 0, scale: 1 })
    }
  }, [index, current.id])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <motion.div
        className="hero-bg-layer"
        animate={{ backgroundColor: current.bgColor }}
        transition={BG_TRANSITION}
      >
        <motion.div
          className="hero-circle hero-circle--left"
          animate={{ backgroundColor: current.circleColor }}
          transition={BG_TRANSITION}
        />
        <motion.div
          className="hero-circle hero-circle--right"
          animate={{ backgroundColor: current.circleColor }}
          transition={BG_TRANSITION}
        />
      </motion.div>

      <OfferMarquee />
      <Navbar onOpenAccount={onOpenAccount} currentRoute="home" />

      <div className="hero-main">
        <div className="hero-body">
          <motion.div
            className="hero-text"
            animate={{ color: current.textColor }}
            transition={BG_TRANSITION}
          >
            <div className="hero-kicker-badge">
              <span className="hero-kicker-dot" />
              <span>Crafted by Rural Women • Rooted in Nature</span>
            </div>

            <h1>
              <span className="hero-title-word">
                THENEE
                <svg className="hero-title-leaf" width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 20c0-8 6-14 14-14 0 8-6 14-14 14Z" fill="#C6A15B" />
                </svg>
              </span>
              <br />
              <span className="hero-title-subtext">{current.name}</span>
            </h1>

            {current.tamilName && (
              <div className="hero-tamil-pill">{current.tamilName}</div>
            )}

            <motion.p animate={{ color: current.subTextColor }} transition={BG_TRANSITION}>
              {current.description}
            </motion.p>

            {/* Quick pricing & benefits summary */}
            <div className="hero-price-tag">
              <span className="hero-price-now">₹{current.price}</span>
              <span className="hero-price-orig">₹{current.originalPrice}</span>
              <span className="hero-volume-badge">{current.volume}</span>
              <span className="hero-rating-badge">★ {current.rating} ({current.reviews}+)</span>
            </div>

            <div className="hero-actions">
              <button
                className="btn btn-cream"
                onClick={() => {
                  addToCart(current)
                  openCart()
                }}
              >
                Add to Cart • ₹{current.price}
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setSelectedProduct(current)}
              >
                Quick View & Benefits
              </button>
            </div>

            <div className="hero-nav">
              <button className="hero-arrow" onClick={prev} aria-label="Previous product">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="hero-nav-count">
                {String(index + 1).padStart(2, '0')} / {String(len).padStart(2, '0')}
              </span>
              <button className="hero-arrow" onClick={next} aria-label="Next product">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="hero-family-count">
                Trusted by <strong>16,000+</strong> families
              </span>
            </div>
          </motion.div>

          <div className="hero-right">
            <div className="hero-visual">
              <div className="hero-visual-bottle-layer">
                {products.map((p, i) => (
                  <div
                    key={p.id}
                    className="hero-bottle-fly"
                    data-perfume-id={p.id}
                    ref={(el) => (bottleFlyRefs.current[p.id] = el)}
                  >
                    <motion.img
                      src={p.bottle}
                      alt={p.name}
                      className="hero-bottle-img"
                      animate={{ opacity: i === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-badges">
              <div className="hero-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 20c0-8 6-14 14-14 0 8-6 14-14 14Z" className="hero-badge-icon-leaf" />
                </svg>
                <span>
                  100%
                  <br />
                  Organic
                </span>
              </div>
              <div className="hero-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    className="hero-badge-icon-drop"
                  />
                </svg>
                <span>
                  Crafted by
                  <br />
                  Rural Women
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
