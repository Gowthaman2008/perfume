import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { brandInfo } from '../data/products'
import './CartDrawer.css'

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalCount,
    subtotal,
    savings,
    freeShippingThreshold,
    amountToFreeShipping,
    isFreeShipping,
    generateWhatsAppOrderUrl,
  } = useCart()

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isCartOpen])

  if (!isCartOpen) return null

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100)

  return (
    <div className="cart-backdrop" onClick={closeCart}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Shopping Cart"
        data-lenis-prevent
      >
        <div className="cart-header">
          <div className="cart-header-title">
            <h3>Your Herbal Cart</h3>
            <span className="cart-count-pill">{totalCount} items</span>
          </div>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Free delivery progress */}
        <div className="cart-shipping-banner">
          <div className="cart-shipping-text">
            {isFreeShipping ? (
              <span>🎉 You unlocked <strong>FREE Delivery</strong> across India!</span>
            ) : (
              <span>
                Add <strong>₹{amountToFreeShipping}</strong> more to get <strong>FREE Delivery!</strong>
              </span>
            )}
          </div>
          <div className="cart-shipping-bar">
            <div
              className="cart-shipping-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🌱</div>
            <h4>Your cart is empty</h4>
            <p>Explore our organic herbal teas and traditional food podis.</p>
            <button className="cart-continue-btn" onClick={closeCart}>
              Explore Products
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-img-wrap">
                    <img src={item.cardImage} alt={item.name} className="cart-item-img" />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <button
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                    {item.tamilName && (
                      <span className="cart-item-tamil">{item.tamilName}</span>
                    )}
                    <span className="cart-item-volume">{item.volume}</span>
                    <div className="cart-item-bottom">
                      <div className="cart-qty-ctrl">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-item-price">
                        <strong>₹{item.price * item.quantity}</strong>
                        {item.originalPrice > item.price && (
                          <span className="cart-item-original">
                            ₹{item.originalPrice * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              {savings > 0 && (
                <div className="cart-summary-row cart-savings">
                  <span>Savings</span>
                  <span className="cart-savings-val">−₹{savings}</span>
                </div>
              )}
              <div className="cart-summary-row">
                <span>Delivery</span>
                <span>{isFreeShipping ? 'FREE' : '₹40'}</span>
              </div>
              <div className="cart-summary-total">
                <span>Grand Total</span>
                <span className="cart-total-price">
                  ₹{subtotal + (isFreeShipping ? 0 : 40)}
                </span>
              </div>

              {/* Express WhatsApp Order Button */}
              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="cart-whatsapp-checkout-btn"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.12.82.83-3.04-.19-.3a8.17 8.17 0 0 1-1.25-4.47c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.59.2-1.09.14-1.19-.05-.1-.22-.16-.47-.28Z" />
                </svg>
                Order via WhatsApp (Instant)
              </a>

              <p className="cart-trust-note">
                🌿 Handcrafted by Rural Women Entrepreneurs | FSSAI: {brandInfo.fssai}
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer

