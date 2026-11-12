import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { brandInfo } from '../data/products'
import './Navbar.css'

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Products', href: '#catalog' },
  { name: 'Food Podis', href: '#podis' },
  { name: 'Health Goals', href: '#wellness' },
  { name: 'Our Story', href: '#about' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { totalCount, openCart } = useCart()

  return (
    <nav className="navbar">
      <a href="#home" className="navbar-brand">
        <img
          src="/images/custom_thenee/thenee-brand-logo.png"
          alt="THENEE - The Roots Enterprises"
          className="navbar-brand-logo"
        />
        <div className="navbar-brand-text">
          <span className="navbar-brand-title">THENEE</span>
          <span className="navbar-brand-sub">தேனீ • Roots of Nature</span>
        </div>
      </a>

      <button
        className="navbar-burger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar-links ${open ? 'is-open' : ''}`}>
        {NAV_LINKS.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="navbar-link"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar-actions">
        {/* FSSAI badge */}
        <div className="navbar-fssai-pill" title={`FSSAI License: ${brandInfo.fssai}`}>
          <span className="fssai-dot" />
          <span className="fssai-text">FSSAI Certified</span>
        </div>

        {/* Cart button with count */}
        <button
          className="navbar-cart-btn"
          onClick={openCart}
          aria-label={`Shopping Cart with ${totalCount} items`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="21" r="1.4" fill="currentColor" />
            <circle cx="17" cy="21" r="1.4" fill="currentColor" />
          </svg>
          {totalCount > 0 && <span className="navbar-cart-badge">{totalCount}</span>}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
