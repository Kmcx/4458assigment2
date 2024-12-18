const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

router.use(
  '/',
  createProxyMiddleware({
    target: 'http://127.0.0.1:5002', // Bookings servisi URL'si
    changeOrigin: true,
    pathRewrite: { '^/api/bookings': '' },
  })
);

module.exports = router;
