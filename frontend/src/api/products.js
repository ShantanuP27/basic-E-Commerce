import mockProducts from '../data/products.js'

// Talks to the backend product API (JIRA-4). If the backend is unreachable
// we fall back to local mock data so the UI still works during development.

export async function fetchProducts(search = '') {
  const qs = search ? `?search=${encodeURIComponent(search)}` : ''
  try {
    const res = await fetch(`/api/products${qs}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    // Backend not available — filter mock data locally.
    const term = search.trim().toLowerCase()
    return term
      ? mockProducts.filter((p) => p.name.toLowerCase().includes(term))
      : mockProducts
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`/api/products/${id}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    return mockProducts.find((p) => String(p.id) === String(id)) || null
  }
}
