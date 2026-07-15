const products = require('../data/products');

// GET /api/products  (optional ?search=xyz keyword filter on name)
function getProducts(req, res) {
  const { search } = req.query;

  if (search && search.trim() !== '') {
    const keyword = search.trim().toLowerCase();
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(keyword)
    );
    return res.json(filtered);
  }

  return res.json(products);
}

// GET /api/products/:id
function getProductById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product id' });
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(product);
}

module.exports = { getProducts, getProductById };
