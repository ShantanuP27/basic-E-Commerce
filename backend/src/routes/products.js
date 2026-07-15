const express = require('express');

const { getProducts, getProductById } = require('../controllers/productsController');

const router = express.Router();

// GET /api/products  and  GET /api/products?search=xyz
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

module.exports = router;
