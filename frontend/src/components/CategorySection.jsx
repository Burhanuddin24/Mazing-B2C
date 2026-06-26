import { Link } from 'react-router-dom'

const ICONS = {
  default: (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
}

export default function CategorySection({ categories = [], loading }) {
  const bgColors = [
    '#eff6ff', '#f0fdf4', '#fefce8', '#fdf4ff',
    '#fff7ed', '#f0f9ff', '#fdf2f8', '#f7fee7',
  ]
  const textColors = [
    '#1B3A6B', '#166534', '#854d0e', '#6b21a8',
    '#9a3412', '#0369a1', '#be185d', '#3f6212',
  ]

  if (loading) {
    return (
      <section style={{ padding: '48px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ height: 100, backgroundColor: '#e5e7eb', borderRadius: 12, animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
      </section>
    )
  }

  return (
    <section style={{ padding: '48px 0', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>
            Shop by Category
          </h2>
          <p style={{ color: '#6b7280', fontSize: 15 }}>
            Find the right tool for every job
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 16,
        }}>
          {categories.map((cat, i) => {
            const bg = bgColors[i % bgColors.length]
            const color = textColors[i % textColors.length]
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    backgroundColor: bg, borderRadius: 12, padding: '20px 12px',
                    textAlign: 'center', cursor: 'pointer', border: `1px solid ${bg}`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ color, marginBottom: 10 }}>{ICONS.default}</div>
                  <p style={{ fontSize: 13, fontWeight: 600, color, lineHeight: 1.3 }}>
                    {cat.name}
                  </p>
                  {cat.product_count > 0 && (
                    <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
                      {cat.product_count} items
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link
            to="/products"
            style={{
              display: 'inline-block', padding: '10px 28px',
              border: '2px solid #1B3A6B', color: '#1B3A6B',
              borderRadius: 8, fontWeight: 600, fontSize: 14,
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1B3A6B'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1B3A6B' }}
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
