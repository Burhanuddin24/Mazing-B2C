import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../services/api'
import Loader from '../components/Loader'

const PLACEHOLDER = 'https://placehold.co/600x500/e2e8f0/94a3b8?text=No+Image'

function Badge({ label, color = '#1B3A6B', bg = '#eff6ff' }) {
  return (
    <span style={{ backgroundColor: bg, color, fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20, border: `1px solid ${color}22` }}>
      {label}
    </span>
  )
}

function TabPanel({ title, children }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>{title}</h4>
      {children}
    </div>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    setLoading(true)
    setError(false)
    getProduct(slug)
      .then((res) => setProduct(res.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div style={{ padding: '60px 0' }}><Loader text="Loading product..." /></div>

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Product Not Found</h2>
        <p style={{ color: '#6b7280', marginBottom: 24 }}>This product may no longer be available.</p>
        <Link to="/products" style={{ backgroundColor: '#1B3A6B', color: '#fff', padding: '10px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
          Back to Products
        </Link>
      </div>
    )
  }

  const {
    name, part_no, brand, category, mrp, selling_price, current_stock,
    image, description, specifications, features, warranty, usage_application,
    technical_details, enrichment,
  } = product

  const effectiveDescription = enrichment?.description || description
  const effectiveSpecs = enrichment?.specifications || specifications
  const effectiveFeatures = enrichment?.features || features
  const effectiveWarranty = enrichment?.warranty || warranty
  const effectiveUsage = enrichment?.usage_application || usage_application
  const effectiveTechnical = enrichment?.technical_details || technical_details

  const discount = mrp && selling_price && mrp > selling_price
    ? Math.round(((mrp - selling_price) / mrp) * 100)
    : null

  const inStock = current_stock >= 1

  const tabs = [
    { key: 'description', label: 'Description' },
    { key: 'specifications', label: 'Specifications' },
    { key: 'features', label: 'Features' },
    { key: 'warranty', label: 'Warranty & Usage' },
  ]

  const parseJsonOrString = (val) => {
    if (!val) return null
    if (typeof val === 'object') return val
    try { return JSON.parse(val) } catch { return val }
  }

  const renderSpecs = (specs) => {
    const parsed = parseJsonOrString(specs)
    if (!parsed) return null
    if (typeof parsed === 'string') return <p style={{ fontSize: 14, lineHeight: 1.7, color: '#374151' }}>{parsed}</p>
    if (Array.isArray(parsed)) {
      return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <tbody>
            {parsed.map((row, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8f9fa' : '#fff' }}>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid #e5e7eb', fontWeight: 600, color: '#374151', width: '40%' }}>{row.key || row.name || row.label}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <tbody>
          {Object.entries(parsed).map(([k, v], i) => (
            <tr key={k} style={{ backgroundColor: i % 2 === 0 ? '#f8f9fa' : '#fff' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e5e7eb', fontWeight: 600, color: '#374151', width: '40%', textTransform: 'capitalize' }}>{k.replace(/_/g, ' ')}</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>{String(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const renderFeatures = (feat) => {
    const parsed = parseJsonOrString(feat)
    if (!parsed) return null
    if (typeof parsed === 'string') return <p style={{ fontSize: 14, lineHeight: 1.7, color: '#374151' }}>{parsed}</p>
    const items = Array.isArray(parsed) ? parsed : Object.values(parsed)
    return (
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#374151', lineHeight: 1.5 }}>
            <span style={{ color: '#F97316', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
            {String(item)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: 24, fontSize: 13, color: '#6b7280', display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <Link to="/products" style={{ color: '#6b7280', textDecoration: 'none' }}>Products</Link>
        <span>/</span>
        <span style={{ color: '#1a1a1a', fontWeight: 500 }} className="line-clamp-2">{name}</span>
      </nav>

      {/* Main product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48 }}>
        {/* Image */}
        <div style={{ backgroundColor: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <img
            src={image || PLACEHOLDER}
            alt={name}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            onError={(e) => { e.target.src = PLACEHOLDER }}
          />
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {brand && <Badge label={brand} color="#1B3A6B" bg="#eff6ff" />}
            {category && <Badge label={category} color="#166534" bg="#f0fdf4" />}
            <Badge
              label={inStock ? 'In Stock' : 'Out of Stock'}
              color={inStock ? '#166534' : '#991b1b'}
              bg={inStock ? '#f0fdf4' : '#fef2f2'}
            />
          </div>

          {/* Name */}
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3 }}>{name}</h1>

          {/* Part number */}
          {part_no && (
            <p style={{ fontSize: 13, color: '#6b7280', backgroundColor: '#f8f9fa', padding: '6px 12px', borderRadius: 6, display: 'inline-block', fontFamily: 'monospace' }}>
              Part No: <strong>{part_no}</strong>
            </p>
          )}

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#1B3A6B' }}>
              ₹{Number(selling_price).toLocaleString('en-IN')}
            </span>
            {mrp && mrp > selling_price && (
              <>
                <span style={{ fontSize: 18, color: '#9ca3af', textDecoration: 'line-through' }}>
                  ₹{Number(mrp).toLocaleString('en-IN')}
                </span>
                <span style={{ backgroundColor: '#F97316', color: '#fff', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
                  -{discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: inStock ? '#22c55e' : '#ef4444' }} />
            <span style={{ fontSize: 14, color: inStock ? '#166534' : '#991b1b', fontWeight: 500 }}>
              {inStock ? `${current_stock} units available` : 'Currently out of stock'}
            </span>
          </div>

          {/* Quick info grid */}
          {effectiveTechnical && (
            <div style={{ backgroundColor: '#f8f9fa', borderRadius: 10, padding: 16 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Quick Specs</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {Object.entries(parseJsonOrString(effectiveTechnical) || {}).slice(0, 4).map(([k, v]) => (
                  <div key={k}>
                    <p style={{ fontSize: 11, color: '#9ca3af', textTransform: 'capitalize' }}>{k.replace(/_/g, ' ')}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{String(v)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enrichment notice */}
          {!effectiveDescription && !effectiveSpecs && !effectiveFeatures && (
            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: 14 }}>
              <p style={{ fontSize: 13, color: '#92400e' }}>
                Detailed product information is being compiled. Check back soon.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {/* Tab nav */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', overflowX: 'auto' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '14px 24px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500,
                backgroundColor: 'transparent', whiteSpace: 'nowrap',
                color: activeTab === tab.key ? '#1B3A6B' : '#6b7280',
                borderBottom: activeTab === tab.key ? '2px solid #1B3A6B' : '2px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: 28 }}>
          {activeTab === 'description' && (
            <TabPanel title="Product Description">
              {effectiveDescription
                ? <p style={{ fontSize: 14, lineHeight: 1.8, color: '#374151' }}>{effectiveDescription}</p>
                : <p style={{ fontSize: 14, color: '#9ca3af' }}>No description available yet.</p>}
            </TabPanel>
          )}

          {activeTab === 'specifications' && (
            <TabPanel title="Technical Specifications">
              {effectiveSpecs
                ? renderSpecs(effectiveSpecs)
                : <p style={{ fontSize: 14, color: '#9ca3af' }}>Specifications not available yet.</p>}
            </TabPanel>
          )}

          {activeTab === 'features' && (
            <TabPanel title="Key Features">
              {effectiveFeatures
                ? renderFeatures(effectiveFeatures)
                : <p style={{ fontSize: 14, color: '#9ca3af' }}>Features not listed yet.</p>}
            </TabPanel>
          )}

          {activeTab === 'warranty' && (
            <TabPanel title="Warranty & Usage">
              {effectiveWarranty && (
                <div style={{ marginBottom: 20 }}>
                  <h5 style={{ fontSize: 13, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8 }}>Warranty</h5>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: '#374151' }}>{effectiveWarranty}</p>
                </div>
              )}
              {effectiveUsage && (
                <div>
                  <h5 style={{ fontSize: 13, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8 }}>Usage / Application</h5>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: '#374151' }}>{effectiveUsage}</p>
                </div>
              )}
              {!effectiveWarranty && !effectiveUsage && (
                <p style={{ fontSize: 14, color: '#9ca3af' }}>Warranty and usage information not available yet.</p>
              )}
            </TabPanel>
          )}
        </div>
      </div>

      {/* Back link */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <Link to="/products" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: '#1B3A6B', textDecoration: 'none', fontWeight: 600, fontSize: 14
        }}>
          ← Back to Products
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
