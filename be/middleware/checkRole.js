// middleware/checkRole.js
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: 'Không xác thực được người dùng.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Không đủ quyền.' });
    }

    next();
  };
};

module.exports = checkRole;
