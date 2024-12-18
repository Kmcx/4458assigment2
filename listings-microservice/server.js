const express = require('express');
const connectDB = require('./config/db');
const { swaggerUi, swaggerDocs } = require('./config/swagger-listings');
const app = express();
require('dotenv').config();

// Veritabanı bağlantısı
connectDB();

// Middleware
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Routes
app.use('/api/listings', require('./routes/listings'));

app.get('/', (req, res) => {
    res.send('Listings Service is up and running!');
  });
app.listen(5003, () => {
    console.log('Listings Service running on http://localhost:5003');
    console.log('Swagger Docs available at http://localhost:5003/api-docs');
  });
