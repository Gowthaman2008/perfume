import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './LoginPage.css'

const DEMO_USER = {
  name: 'Gowtham',
  contact: '+91 75502 48005',
  email: 'gowtham@example.com',
  address: '2/104, Gandhi Street, Anna Nagar',
  city: 'Tenkasi',
  district: 'Tenkasi District',
  pincode: '627811',
  state: 'Tamil Nadu',
  joinedDate: 'Oct 2024',
  points: 250,
  language: 'English',
  healthGoals: ['Blood Sugar Control', 'Internal Body Cooling', 'Gut Health'],
}

const LoginPage = ({ onLoginSuccess, onBack }) => {
  const { loginUser } = useCart()

  // Primary view: 'signin' | 'signup'
  const [view, setView] = useState('signin')

  // Auth method under signin: 'phone' | 'email'
  const [authMethod, setAuthMethod] = useState('phone')

  // Phone OTP States
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')

  // Email States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Registration Form
  const [signupForm, setSignupForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 1-Click Demo Login
  const handleQuickDemoLogin = () => {
    setIsLoading(true)
    setErrorMessage('')
    setTimeout(() => {
      loginUser(DEMO_USER)
      setIsLoading(false)
      if (onLoginSuccess) onLoginSuccess()
    }, 300)
  }

  // Handle Google Login
  const handleGoogleLogin = () => {
    setIsLoading(true)
    setErrorMessage('')
    setTimeout(() => {
      const googleUser = {
        name: 'Gowtham',
        contact: '+91 75502 48005',
        email: 'gowtham@gmail.com',
        address: '2/104, Gandhi Street, Anna Nagar',
        city: 'Tenkasi',
        district: 'Tenkasi District',
        pincode: '627811',
        state: 'Tamil Nadu',
        joinedDate: 'Oct 2024',
        points: 250,
        language: 'English',
        healthGoals: ['Blood Sugar Control', 'Internal Body Cooling', 'Gut Health'],
        authProvider: 'google',
      }
      loginUser(googleUser)
      setIsLoading(false)
      if (onLoginSuccess) onLoginSuccess()
    }, 350)
  }

  // Handle Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault()
    setErrorMessage('')
    const clean = phoneNumber.replace(/\D/g, '')
    if (clean.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setOtpSent(true)
    }, 350)
  }

  // Handle Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!otpCode || otpCode.trim().length !== 4) {
      setErrorMessage('Please enter the 4-digit verification code')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const clean = phoneNumber.replace(/\D/g, '').slice(-10)
      const isDemo = clean === '7550248005'
      const user = isDemo
        ? DEMO_USER
        : {
            name: `Member (${clean.slice(-4)})`,
            contact: `+91 ${clean}`,
            email: '',
            joinedDate: 'Nov 2026',
            points: 100,
            language: 'English',
            healthGoals: ['Daily Botanical Wellness'],
          }

      loginUser(user)
      if (onLoginSuccess) onLoginSuccess()
    }, 350)
  }

  // Handle Email Login
  const handleEmailLogin = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address')
      return
    }
    if (!password || password.length < 4) {
      setErrorMessage('Password must be at least 4 characters')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const namePart = email.split('@')[0]
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1)
      const user = {
        name: capitalized,
        contact: '+91 75502 48005',
        email,
        joinedDate: 'Nov 2026',
        points: 150,
        language: 'English',
        healthGoals: ['Blood Sugar Control', 'Immunity'],
      }

      loginUser(user)
      if (onLoginSuccess) onLoginSuccess()
    }, 350)
  }

  // Handle Signup
  const handleSignup = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!signupForm.name.trim()) {
      setErrorMessage('Please enter your full name')
      return
    }
    const clean = signupForm.phone.replace(/\D/g, '')
    if (clean.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const user = {
        name: signupForm.name.trim(),
        contact: `+91 ${clean.slice(-10)}`,
        email: signupForm.email.trim(),
        joinedDate: 'Nov 2026',
        points: 100,
        language: 'English',
        healthGoals: ['Daily Botanical Wellness'],
      }

      loginUser(user)
      if (onLoginSuccess) onLoginSuccess()
    }, 400)
  }

  return (
    <div className="pro-login-page">
      {/* Top Header */}
      <header className="pro-login-header">
        <div className="pro-login-header-inner">
          <button
            type="button"
            className="pro-back-btn"
            onClick={onBack || (() => { window.location.hash = 'home' })}
            aria-label="Return to store"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back to Store</span>
          </button>

          <a href="#home" className="pro-brand" onClick={(e) => { e.preventDefault(); if (onBack) onBack(); else window.location.hash = 'home'; }}>
            <span className="pro-brand-name">THENEE</span>
            <span className="pro-brand-tag">KADAYAM • TENKASI</span>
          </a>

          <div className="pro-secure-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Secure</span>
          </div>
        </div>
      </header>

      {/* Main Form Center */}
      <main className="pro-login-main">
        <div className="pro-login-card">
          {/* Card Top Title */}
          <div className="pro-card-header">
            <div className="pro-leaf-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#31543A" strokeWidth="2">
                <path d="M11 20A7 7 0 0 1 4 13C4 8 8 3 13 3c5 0 7 2 7 7 0 5-4 10-9 10Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 20V12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1>{view === 'signin' ? 'Sign In' : 'Create an Account'}</h1>
            <p>
              {view === 'signin'
                ? 'Access your orders, track consignments & member perks.'
                : 'Join THENEE to track orders and earn green reward points.'}
            </p>
          </div>

          {/* SIGN IN VIEW */}
          {view === 'signin' && (
            <>
              {/* Method Switcher: Mobile OTP vs Email */}
              <div className="pro-method-toggle" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={authMethod === 'phone'}
                  className={`pro-method-btn ${authMethod === 'phone' ? 'is-active' : ''}`}
                  onClick={() => {
                    setAuthMethod('phone')
                    setErrorMessage('')
                  }}
                >
                  Mobile OTP
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={authMethod === 'email'}
                  className={`pro-method-btn ${authMethod === 'email' ? 'is-active' : ''}`}
                  onClick={() => {
                    setAuthMethod('email')
                    setErrorMessage('')
                  }}
                >
                  Email
                </button>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="pro-error-msg" role="alert">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Phone OTP Form */}
              {authMethod === 'phone' && (
                !otpSent ? (
                  <form onSubmit={handleSendOtp} className="pro-form">
                    <div className="pro-input-group">
                      <label htmlFor="pro-phone-input">Mobile Number</label>
                      <div className="pro-phone-field">
                        <span className="pro-prefix">+91</span>
                        <input
                          id="pro-phone-input"
                          type="tel"
                          maxLength={10}
                          placeholder="98765 43210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          required
                          autoFocus
                        />
                      </div>
                      <span className="pro-field-hint">We will send a 4-digit verification code.</span>
                    </div>

                    <button
                      type="submit"
                      className="pro-submit-btn"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending Code...' : 'Continue'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="pro-form">
                    <div className="pro-otp-meta">
                      <span>Code sent to <strong>+91 {phoneNumber}</strong></span>
                      <button
                        type="button"
                        className="pro-link-btn"
                        onClick={() => {
                          setOtpSent(false)
                          setOtpCode('')
                        }}
                      >
                        Change
                      </button>
                    </div>

                    <div className="pro-input-group">
                      <div className="pro-otp-label-row">
                        <label htmlFor="pro-otp-input">Verification Code</label>
                        <button
                          type="button"
                          className="pro-demo-fill-btn"
                          onClick={() => setOtpCode('1234')}
                        >
                          Auto-fill 1234
                        </button>
                      </div>
                      <input
                        id="pro-otp-input"
                        type="text"
                        maxLength={4}
                        placeholder="• • • •"
                        className="pro-otp-input"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        required
                        autoFocus
                      />
                    </div>

                    <button
                      type="submit"
                      className="pro-submit-btn"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Verifying...' : 'Sign In'}
                    </button>
                  </form>
                )
              )}

              {/* Email & Password Form */}
              {authMethod === 'email' && (
                <form onSubmit={handleEmailLogin} className="pro-form">
                  <div className="pro-input-group">
                    <label htmlFor="pro-email-input">Email Address</label>
                    <input
                      id="pro-email-input"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="pro-input-group">
                    <div className="pro-label-row">
                      <label htmlFor="pro-password-input">Password</label>
                      <button
                        type="button"
                        className="pro-link-btn"
                        onClick={() => setErrorMessage('For demo access, any password of 4+ characters will log you in.')}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="pro-password-field">
                      <input
                        id="pro-password-input"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="pro-show-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="pro-submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In with Email'}
                  </button>
                </form>
              )}

              {/* Divider */}
              <div className="pro-divider">
                <span>or</span>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                className="pro-google-btn"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Quick Demo Access Option */}
              <button
                type="button"
                className="pro-demo-account-btn"
                onClick={handleQuickDemoLogin}
                disabled={isLoading}
                title="1-Click login as Gowtham (+91 75502 48005)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Demo Login as Gowtham</span>
              </button>

              {/* Toggle to Signup */}
              <div className="pro-card-footer">
                <span>Don&apos;t have an account?</span>{' '}
                <button
                  type="button"
                  className="pro-text-link"
                  onClick={() => {
                    setView('signup')
                    setErrorMessage('')
                  }}
                >
                  Create account
                </button>
              </div>
            </>
          )}

          {/* SIGN UP VIEW */}
          {view === 'signup' && (
            <>
              {errorMessage && (
                <div className="pro-error-msg" role="alert">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSignup} className="pro-form">
                <div className="pro-input-group">
                  <label htmlFor="reg-name">Full Name</label>
                  <input
                    id="reg-name"
                    type="text"
                    placeholder="Enter your name"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    required
                    autoFocus
                  />
                </div>

                <div className="pro-input-group">
                  <label htmlFor="reg-phone">Mobile Number</label>
                  <div className="pro-phone-field">
                    <span className="pro-prefix">+91</span>
                    <input
                      id="reg-phone"
                      type="tel"
                      maxLength={10}
                      placeholder="98765 43210"
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value.replace(/\D/g, '') })}
                      required
                    />
                  </div>
                </div>

                <div className="pro-input-group">
                  <label htmlFor="reg-email">Email Address (Optional)</label>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="name@example.com"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  />
                </div>

                <div className="pro-bonus-note">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2D5A3D" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Includes <strong>100 Free Welcome Green Points</strong></span>
                </div>

                <button
                  type="submit"
                  className="pro-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              {/* Divider */}
              <div className="pro-divider">
                <span>or</span>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                className="pro-google-btn"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign up with Google</span>
              </button>

              {/* Toggle to Signin */}
              <div className="pro-card-footer">
                <span>Already have an account?</span>{' '}
                <button
                  type="button"
                  className="pro-text-link"
                  onClick={() => {
                    setView('signin')
                    setErrorMessage('')
                  }}
                >
                  Sign in
                </button>
              </div>
            </>
          )}

          {/* Micro Trust Line */}
          <div className="pro-micro-trust">
            <span>🔒 256-Bit SSL Encrypted</span>
            <span>•</span>
            <span>FSSAI Certified</span>
            <span>•</span>
            <span>Zero Spam</span>
          </div>
        </div>
      </main>

      {/* Clean Bottom Footer */}
      <footer className="pro-login-footer">
        <p>© {new Date().getFullYear()} The Roots Enterprises • Kadayam, Tenkasi</p>
        <a
          href="https://www.crearemind.in"
          target="_blank"
          rel="noopener noreferrer"
          className="pro-crearemind-link"
          title="Visit Creare Mind (opens in new tab)"
        >
          <span>POWERED BY</span> <strong>CREARE MIND</strong>
        </a>
      </footer>
    </div>
  )
}

export default LoginPage
