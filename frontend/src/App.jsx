import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import NotFound from './pages/NotFound.jsx'
import ChatWidget from './components/ChatWidget.jsx'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="brand">Shop</Link>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ChatWidget />
    </div>
  )
}
