import { createContext, useContext, useState, useEffect } from 'react'
import { brandInfo } from '../data/products'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('thenee_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('thenee_cart', JSON.stringify(cartItems))
    } catch {
      // storage error fallback
    }
  }, [cartItems])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          tamilName: product.tamilName || '',
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          volume: product.volume,
          cardImage: product.bottle || product.cardImage || product.image,
          quantity,
        },
      ]
    })
    showToast(`Added ${product.name} to bag!`)
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const clearCart = () => setCartItems([])

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalOriginal = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice || item.price) * item.quantity,
    0
  )
  const savings = Math.max(0, totalOriginal - subtotal)

  // Free delivery threshold: ₹499
  const freeShippingThreshold = 499
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal)
  const isFreeShipping = subtotal >= freeShippingThreshold

  const generateWhatsAppOrderUrl = () => {
    if (cartItems.length === 0) {
      return `https://wa.me/917550248005?text=${encodeURIComponent(
        'Hello THENEE team! I would like to know more about your herbal products.'
      )}`
    }

    let text = `Namaste THENEE! 🌱\nI would like to order the following herbal products:\n\n`
    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}* (${item.volume || ''})\n   Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n`
    })

    text += `\n*Total Amount: ₹${subtotal}*`
    if (savings > 0) {
      text += ` (Saved ₹${savings}!)`
    }
    text += `\nShipping: ${isFreeShipping ? 'FREE Delivery' : 'Standard Delivery'}\n\nPlease share the payment details and delivery time to my address. Thank you!`

    return `https://wa.me/917550248005?text=${encodeURIComponent(text)}`
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((o) => !o),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        savings,
        freeShippingThreshold,
        amountToFreeShipping,
        isFreeShipping,
        selectedProduct,
        setSelectedProduct,
        toastMessage,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

