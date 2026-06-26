import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
  ]

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <header style={{ backgroundColor: '#1B3A6B', boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
      {/* Top bar */}
      <div style={{ backgroundColor: '#122952', padding: '6px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#94a3b8', fontSize: 12 }}>
            Free shipping on orders above ₹2,000
          </span>
          <span style={{ color: '#94a3b8', fontSize: 12 }}>
            support@opeltools.com | +91 98765 43210
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 42, height: 42, backgroundColor: '#F97316', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: '#fff', fontSize: 18, letterSpacing: '-1px'
            }}>OT</div>
            <div>
              <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                Opel Tools
              </div>
              <div style={{ color: '#94a3b8', fontSize: 11, letterSpacing: '0.5px' }}>
                PROFESSIONAL GRADE
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: isActive(link.to) ? '#F97316' : '#cbd5e1',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: 6,
                  fontWeight: 500,
                  fontSize: 15,
                  backgroundColor: isActive(link.to) ? 'rgba(249,115,22,0.1)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/products"
              style={{
                backgroundColor: '#F97316',
                color: '#fff',
                padding: '9px 20px',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                marginLeft: 8,
                transition: 'background 0.2s',
              }}
            >
              Shop Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', background: 'none', border: 'none', cursor: 'pointer',
              color: '#fff', padding: 8
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: 16,
          }} className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  color: isActive(link.to) ? '#F97316' : '#cbd5e1',
                  textDecoration: 'none',
                  padding: '12px 8px',
                  fontWeight: 500,
                  fontSize: 16,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                backgroundColor: '#F97316',
                color: '#fff',
                padding: '12px 8px',
                borderRadius: 6,
                fontWeight: 600,
                textDecoration: 'none',
                marginTop: 12,
                textAlign: 'center',
              }}
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
