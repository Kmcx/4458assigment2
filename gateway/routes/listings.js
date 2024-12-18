const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

router.use(
  '/',
  createProxyMiddleware({
    target: 'http://127.0.0.1:5003', // Listings servisi URL'si
    changeOrigin: true,
    pathRewrite: { '^/api/listings': '' },
  })
);

module.exports = router;
