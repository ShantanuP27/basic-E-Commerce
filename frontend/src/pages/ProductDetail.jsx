import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductById } from '../api/products.js'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | notfound | error

  useEffect(() => {
    let active = true
    setStatus('loading')
    fetchProductById(id)
      .then((data) => {
        if (!active) return
        if (!data) {
          setStatus('notfound')
        } else {
          setProduct(data)
          setStatus('ready')
        }
      })
      .catch(() => active && setStatus('error'))
    return () => {
      active = false
    }
  }, [id])

  return (
    <section>
      <Link to="/" className="back-link">&larr; Back to products</Link>

      {status === 'loading' && <p>Loading…</p>}
      {status === 'error' && <p className="error">Something went wrong.</p>}
      {status === 'notfound' && <p className="empty">Product not found.</p>}

      {status === 'ready' && product && (
        <div className="product-detail">
          <img src={product.image} alt={product.name} />
          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
            <p className="description">{product.description}</p>
            <button className="add-to-cart" type="button">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
