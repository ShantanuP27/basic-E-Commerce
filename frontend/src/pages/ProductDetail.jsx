import { useParams, Link } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()
  return (
    <section>
      <Link to="/">&larr; Back</Link>
      <h1>Product {id}</h1>
      <p>Product detail page — coming soon (JIRA-3).</p>
    </section>
  )
}
