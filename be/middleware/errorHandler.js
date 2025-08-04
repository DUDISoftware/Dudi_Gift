// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('❌ Lỗi:', err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Lỗi server' });
};

module.exports = errorHandler;
