const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const router = express.Router();

router.use(
  '/',
  createProxyMiddleware({
    target: 'http://127.0.0.1:5001', // Auth servisi URL'si
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }, // API Gateway yolu silinir
    logLevel: 'debug', // Debug logları göster
  })
);

module.exports = router;
