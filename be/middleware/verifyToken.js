// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    console.log('🔐 Headers received:', req.headers);
    
    // Get token from Authorization header
    const authHeader = req.headers.authorization || req.header('Authorization');
    console.log('📨 Authorization header:', authHeader);

    if (!authHeader) {
      console.log('❌ No authorization header found');
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    if (!authHeader.startsWith('Bearer ')) {
      console.log('❌ Invalid authorization format. Expected: Bearer <token>');
      return res.status(401).json({ message: 'Invalid token format. Expected: Bearer <token>' });
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);
    console.log('✅ Token extracted:', token.substring(0, 20) + '...'); // Log first 20 chars

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified successfully');
    console.log('👤 Decoded token payload:', verified);

    // Ensure we have the user ID - check different possible fields
    const userId = verified.id || verified._id;
    if (!userId) {
      console.log('❌ No user ID found in token');
      return res.status(401).json({ message: 'Invalid token: no user ID' });
    }

    // Set user information in request
    req.user = {
      _id: userId,
      id: userId,
      email: verified.email,
      name: verified.name
      // Add other fields as needed
    };

    console.log('✅ User set in request:', req.user);
    next();
  } catch (err) {
    console.error('❌ Token verification error:', err.message);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    res.status(500).json({ message: 'Server error during token verification' });
  }
};

module.exports = verifyToken;