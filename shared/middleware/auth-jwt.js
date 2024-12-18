const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const token = authHeader.replace('Bearer ', ''); // Token'ı çıkar
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT doğrula
    req.user = decoded.user; // Kullanıcı bilgisini isteğe ekle
    next(); // Bir sonraki middleware'e geç
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
