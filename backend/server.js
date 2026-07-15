const app = require('./src/app');

// Default 5001 to avoid macOS AirPlay/ControlCenter which occupies :5000.
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
