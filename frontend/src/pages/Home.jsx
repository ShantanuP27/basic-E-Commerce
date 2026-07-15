import { useEffect, useState } from 'react'

export default function Home() {
  const [health, setHealth] = useState('checking...')

  useEffect(() => {
    // Test API call — verifies frontend can reach the Express backend (JIRA-1)
    fetch('/api/health')
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => setHealth(JSON.stringify(data)))
      .catch((err) => setHealth(`error: ${err}`))
  }, [])

  return (
    <section>
      <h1>Products</h1>
      <p>Home page — product listing coming soon (JIRA-2).</p>
      <p><small>Backend health: {health}</small></p>
    </section>
  )
}
