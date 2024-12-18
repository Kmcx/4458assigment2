const express = require('express');
const morgan = require('morgan'); // Request logger
const cors = require('cors');     // Cross-Origin Resource Sharing
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes (Servisler için yönlendirme)
app.use('/api/auth', require('./routes/auth'));          // Auth Servisi
app.use('/api/listings', require('./routes/listings'));  // Listings Servisi
app.use('/api/bookings', require('./routes/bookings'));  // Bookings Servisi

// Sağlık kontrolü
app.get('/', (req, res) => {
  res.send('API Gateway is up and running!');
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
