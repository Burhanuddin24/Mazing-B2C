import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts, getCategories } from '../services/api'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const brand = searchParams.get('brand') || ''
  const page = parseInt(searchParams.get('page') || '1')

  const fetchProducts = useCallback(() => {
    setLoading(true)
    getProducts({ search, category, brand, page, per_page: 20 })
      .then((res) => {
        const d = res.data.data
        if (d?.data) {
          setProducts(d.data)
          setPagination({ current_page: d.current_page, last_page: d.last_page, total: d.total })
        } else {
          setProducts(d || [])
          setPagination(null)
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [search, category, brand, page])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  useEffect(() => {
    getCategories()
      .then((res) => {
        const cats = res.data.data || []
        setCategories(cats)
        // Extract unique brands from products on mount (if API provides them)
      })
      .catch(() => {})
  }, [])

  const setParam = (key, val) => {
    const p = new URLSearchParams(searchParams)
    if (val) p.set(key, val)
    else p.delete(key)
    p.delete('page')
    setSearchParams(p)
  }

  const setPage = (p) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', p)
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  const hasFilters = search || category || brand

  const FilterPanel = () => (
    <div style={{ minWidth: 220 }}>
      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>
          Search
        </label>
        <input
          type="text"
          placeholder="Name, part number..."
          value={search}
          onChange={(e) => setParam('search', e.target.value)}
          style={{
            width: '100%', padding: '9px 12px', border: '1px solid #e5e7eb',
            borderRadius: 8, fontSize: 14, outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => e.target.style.borderColor = '#1B3A6B'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>
            Category
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setParam('category', category === cat.slug ? '' : cat.slug)}
                style={{
                  textAlign: 'left', padding: '7px 10px', border: 'none',
                  borderRadius: 6, cursor: 'pointer', fontSize: 13,
                  backgroundColor: category === cat.slug ? '#1B3A6B' : 'transparent',
                  color: category === cat.slug ? '#fff' : '#374151',
                  fontWeight: category === cat.slug ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {cat.name}
                {cat.product_count > 0 && (
                  <span style={{ float: 'right', fontSize: 11, opacity: 0.7 }}>{cat.product_count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brands from filter */}
      {brands.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>
            Brand
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {brands.map((b) => (
              <button
                key={b.slug}
                onClick={() => setParam('brand', brand === b.slug ? '' : b.slug)}
                style={{
                  textAlign: 'left', padding: '7px 10px', border: 'none',
                  borderRadius: 6, cursor: 'pointer', fontSize: 13,
                  backgroundColor: brand === b.slug ? '#F97316' : 'transparent',
                  color: brand === b.slug ? '#fff' : '#374151',
                  fontWeight: brand === b.slug ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasFilters && (
        <button
          onClick={clearFilters}
          style={{
            width: '100%', padding: '8px 0', border: '1px solid #e5e7eb',
            borderRadius: 8, cursor: 'pointer', fontSize: 13,
            color: '#ef4444', backgroundColor: '#fff', fontWeight: 500,
          }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  )

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>
          All Products
        </h1>
        <p style={{ color: '#6b7280', fontSize: 15 }}>
          Showing {pagination?.total ?? products.length} in-stock, B2C-available products
        </p>
      </div>

      {/* Mobile filter toggle */}
      <div style={{ display: 'none' }} className="mobile-filter-bar">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 16px', border: '1px solid #e5e7eb',
            borderRadius: 8, cursor: 'pointer', backgroundColor: '#fff',
            fontSize: 14, fontWeight: 500, marginBottom: 16,
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters {hasFilters && `(active)`}
        </button>

        {sidebarOpen && (
          <div style={{
            backgroundColor: '#fff', border: '1px solid #e5e7eb',
            borderRadius: 12, padding: 20, marginBottom: 20,
          }}>
            <FilterPanel />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <aside style={{
          width: 240, flexShrink: 0,
          backgroundColor: '#fff', border: '1px solid #e5e7eb',
          borderRadius: 12, padding: 20, position: 'sticky', top: 24,
        }} className="desktop-sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' }}>Filters</h3>
            {hasFilters && (
              <button onClick={clearFilters} style={{ fontSize: 12, color: '#F97316', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Clear all
              </button>
            )}
          </div>
          <FilterPanel />
        </aside>

        {/* Products grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {loading ? (
            <Loader text="Loading products..." />
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>No products found</h3>
              <p style={{ color: '#6b7280', marginBottom: 20 }}>Try adjusting your filters or search term</p>
              <button onClick={clearFilters} style={{ backgroundColor: '#1B3A6B', color: '#fff', padding: '9px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 20,
                marginBottom: 32,
              }}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.last_page > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    style={{
                      padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: 8,
                      cursor: page <= 1 ? 'not-allowed' : 'pointer',
                      backgroundColor: '#fff', opacity: page <= 1 ? 0.4 : 1, fontSize: 14,
                    }}
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: Math.min(pagination.last_page, 7) }, (_, i) => {
                    const p = i + 1
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        style={{
                          padding: '8px 14px', borderRadius: 8, fontSize: 14, cursor: 'pointer',
                          border: '1px solid',
                          borderColor: p === page ? '#1B3A6B' : '#e5e7eb',
                          backgroundColor: p === page ? '#1B3A6B' : '#fff',
                          color: p === page ? '#fff' : '#374151',
                          fontWeight: p === page ? 600 : 400,
                        }}
                      >
                        {p}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= pagination.last_page}
                    style={{
                      padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: 8,
                      cursor: page >= pagination.last_page ? 'not-allowed' : 'pointer',
                      backgroundColor: '#fff', opacity: page >= pagination.last_page ? 0.4 : 1, fontSize: 14,
                    }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-filter-bar { display: block !important; }
        }
      `}</style>
    </div>
  )
}
