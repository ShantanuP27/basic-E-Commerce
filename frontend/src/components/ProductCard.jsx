import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </Link>
  )
}
