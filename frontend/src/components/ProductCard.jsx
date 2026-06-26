import { Link } from 'react-router-dom'

const PLACEHOLDER = 'https://placehold.co/400x300/e2e8f0/94a3b8?text=No+Image'

export default function ProductCard({ product }) {
  const { name, slug, part_no, brand, category, selling_price, mrp, image, current_stock } = product

  const discount = mrp && selling_price && mrp > selling_price
    ? Math.round(((mrp - selling_price) / mrp) * 100)
    : null

  return (
    <Link
      to={`/products/${slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(27,58,107,0.12)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', backgroundColor: '#f8f9fa', aspectRatio: '4/3', overflow: 'hidden' }}>
          <img
            src={image || PLACEHOLDER}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12 }}
            onError={(e) => { e.target.src = PLACEHOLDER }}
          />
          {discount && (
            <div style={{
              position: 'absolute', top: 10, right: 10,
              backgroundColor: '#F97316', color: '#fff',
              fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20
            }}>
              -{discount}%
            </div>
          )}
          {current_stock <= 0 && (
            <div style={{
              position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ backgroundColor: '#ef4444', color: '#fff', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Category + Brand tags */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
            {brand && (
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                backgroundColor: '#eff6ff', color: '#1B3A6B', border: '1px solid #bfdbfe'
              }}>{brand}</span>
            )}
            {category && (
              <span style={{
                fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 20,
                backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0'
              }}>{category}</span>
            )}
          </div>

          {/* Name */}
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 4, lineHeight: 1.4 }} className="line-clamp-2">
            {name}
          </h3>

          {/* Part number */}
          {part_no && (
            <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>
              Part No: <strong style={{ color: '#374151' }}>{part_no}</strong>
            </p>
          )}

          {/* Price */}
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#1B3A6B' }}>
              ₹{Number(selling_price).toLocaleString('en-IN')}
            </span>
            {mrp && mrp > selling_price && (
              <span style={{ fontSize: 13, color: '#9ca3af', textDecoration: 'line-through' }}>
                ₹{Number(mrp).toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Footer button */}
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{
            width: '100%', padding: '9px 0', textAlign: 'center',
            backgroundColor: '#1B3A6B', color: '#fff',
            borderRadius: 8, fontSize: 13, fontWeight: 600,
            transition: 'background 0.2s',
          }}>
            View Details
          </div>
        </div>
      </div>
    </Link>
  )
}
