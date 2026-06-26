import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, getCategories } from '../services/api'
import ProductCard from '../components/ProductCard'
import CategorySection from '../components/CategorySection'
import Loader from '../components/Loader'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingCats, setLoadingCats] = useState(true)

  useEffect(() => {
    getProducts({ per_page: 8 })
      .then((res) => setFeaturedProducts(res.data.data?.data || res.data.data || []))
      .catch(() => setFeaturedProducts([]))
      .finally(() => setLoadingProducts(false))

    getCategories()
      .then((res) => setCategories(res.data.data || []))
      .catch(() => setCategories([]))
      .finally(() => setLoadingCats(false))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1B3A6B 0%, #0f2447 60%, #122952 100%)',
        padding: '72px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 300, height: 300, borderRadius: '50%',
          backgroundColor: 'rgba(249,115,22,0.08)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -40,
          width: 250, height: 250, borderRadius: '50%',
          backgroundColor: 'rgba(249,115,22,0.05)', pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-block', backgroundColor: 'rgba(249,115,22,0.15)',
              color: '#F97316', fontSize: 12, fontWeight: 700,
              padding: '5px 14px', borderRadius: 20, marginBottom: 20,
              border: '1px solid rgba(249,115,22,0.3)', letterSpacing: '0.5px'
            }}>
              PROFESSIONAL GRADE TOOLS
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 20, letterSpacing: '-1px' }}>
              Tools Built for{' '}
              <span style={{ color: '#F97316' }}>Every Challenge</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
              Explore our range of professional-grade tools. Trusted by tradesmen, used on every jobsite. Quality that lasts, prices that make sense.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link
                to="/products"
                style={{
                  backgroundColor: '#F97316', color: '#fff',
                  padding: '14px 32px', borderRadius: 8, fontWeight: 700,
                  fontSize: 15, textDecoration: 'none', display: 'inline-block',
                }}
              >
                Shop All Products
              </Link>
              <Link
                to="/products"
                style={{
                  backgroundColor: 'transparent', color: '#fff',
                  padding: '14px 32px', borderRadius: 8, fontWeight: 600,
                  fontSize: 15, textDecoration: 'none', display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                View Categories
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
              {[{ val: '5000+', label: 'Products' }, { val: '50+', label: 'Brands' }, { val: 'Free', label: 'Shipping ₹2000+' }].map((s) => (
                <div key={s.label}>
                  <div style={{ color: '#F97316', fontWeight: 800, fontSize: 22 }}>{s.val}</div>
                  <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 320, height: 320, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="90" stroke="rgba(249,115,22,0.2)" strokeWidth="1" />
                <circle cx="100" cy="100" r="60" stroke="rgba(249,115,22,0.3)" strokeWidth="1" />
                {/* Wrench icon */}
                <path d="M140 40c-16.6 0-30 13.4-30 30 0 5.5 1.5 10.6 4.1 15L60 139c-2.7-1.9-5.9-3-9.3-3C39.2 136 30 145.2 30 156.7c0 11.5 9.2 20.7 20.7 20.7 11.5 0 20.7-9.2 20.7-20.7 0-3.4-1.1-6.6-3-9.3l54-54.1c4.4 2.6 9.5 4.1 15 4.1 16.6 0 30-13.4 30-30 0-5.8-1.7-11.3-4.6-15.8L147 67.4c1.9 3.6 3 7.7 3 12 0 14.4-11.6 26-26 26s-26-11.6-26-26 11.6-26 26-26c4.3 0 8.4 1.1 12 3z"
                  fill="rgba(249,115,22,0.6)" />
              </svg>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
            div[style*="width: 320px"] { display: none !important; }
          }
        `}</style>
      </section>

      {/* USP Strip */}
      <section style={{ backgroundColor: '#F97316', padding: '14px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {[
            { icon: '🚚', label: 'Free Shipping on ₹2,000+' },
            { icon: '✅', label: 'Genuine Products Only' },
            { icon: '🔁', label: 'Easy Returns' },
            { icon: '🛡️', label: 'Warranty Backed' },
          ].map((u) => (
            <div key={u.label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 13, fontWeight: 600 }}>
              <span style={{ fontSize: 16 }}>{u.icon}</span>
              {u.label}
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <CategorySection categories={categories} loading={loadingCats} />

      {/* Featured Products */}
      <section style={{ padding: '48px 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>
                Featured Products
              </h2>
              <p style={{ color: '#6b7280', fontSize: 15 }}>In-stock, ready to ship</p>
            </div>
            <Link
              to="/products"
              style={{
                color: '#F97316', fontWeight: 600, fontSize: 14,
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4
              }}
            >
              View all →
            </Link>
          </div>

          {loadingProducts ? (
            <Loader text="Loading products..." />
          ) : featuredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
              <p style={{ fontSize: 16 }}>No products available yet.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 20,
            }}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #1B3A6B 0%, #0f2447 100%)',
        padding: '56px 24px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Can't find what you're looking for?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 28 }}>
            Browse our full catalogue of 5,000+ professional tools — filters for brand, category, and price.
          </p>
          <Link
            to="/products"
            style={{
              backgroundColor: '#F97316', color: '#fff',
              padding: '14px 36px', borderRadius: 8,
              fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block',
            }}
          >
            Browse Full Catalogue
          </Link>
        </div>
      </section>
    </div>
  )
}
