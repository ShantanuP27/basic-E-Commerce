import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { fetchProducts } from '../api/products.js'

export default function Home() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let active = true
    setStatus('loading')
    // Debounce search so we don't hit the backend on every keystroke.
    const t = setTimeout(() => {
      fetchProducts(search)
        .then((data) => {
          if (!active) return
          setProducts(Array.isArray(data) ? data : [])
          setStatus('ready')
        })
        .catch(() => active && setStatus('error'))
    }, 250)
    return () => {
      active = false
      clearTimeout(t)
    }
  }, [search])

  return (
    <section>
      <h1>Products</h1>
      <SearchBar value={search} onChange={setSearch} />

      {status === 'loading' && <p>Loading products…</p>}
      {status === 'error' && (
        <p className="error">Something went wrong. Please try again.</p>
      )}
      {status === 'ready' && products.length === 0 && (
        <p className="empty">No results found{search ? ` for “${search}”` : ''}.</p>
      )}

      {status === 'ready' && products.length > 0 && (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}
