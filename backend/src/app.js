const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const productRoutes = require('./routes/products');
const chatRoutes = require('./routes/chat');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
