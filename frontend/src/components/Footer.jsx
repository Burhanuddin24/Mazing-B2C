import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f1e36', color: '#94a3b8', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 38, height: 38, backgroundColor: '#F97316', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, color: '#fff', fontSize: 16
              }}>OT</div>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Opel Tools</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b' }}>
              Professional-grade tools for every job. Quality you can trust, prices that work for you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{ to: '/', label: 'Home' }, { to: '/products', label: 'All Products' }].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#F97316'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Contact Us
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <li>support@opeltools.com</li>
              <li>+91 98765 43210</li>
              <li style={{ lineHeight: 1.6 }}>Mon–Sat, 9am–6pm IST</li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e2d45', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13 }}>© {new Date().getFullYear()} Opel Tools. All rights reserved.</p>
          <p style={{ fontSize: 13 }}>Powered by Mazing Business</p>
        </div>
      </div>
    </footer>
  )
}
