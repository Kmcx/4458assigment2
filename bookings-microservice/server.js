const express = require('express');
const connectDB = require('./config/db');
const { swaggerUi, swaggerDocs } = require('./config/swagger-bookings');
const app = express();
require('dotenv').config();

// Veritabanı bağlantısı
connectDB();

// Middleware
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/', (req, res) => {
    res.send('Bookings Service is up and running!');
  });
// Routes
app.use('/api/bookings', require('./routes/bookings'));

app.listen(5002, () => {
    console.log('Bookings Service running on http://localhost:5002');
    console.log('Swagger Docs available at http://localhost:5002/api-docs');
  });
