const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  // ⚠️ AUTENTICAZIONE TEMPORANEAMENTE DISABILITATA PER SVILUPPO
  // Permetti l'accesso senza token
  console.log('⚠️  Auth middleware bypassed - development mode');
  req.user = { _id: 'dev-user', role: 'user' }; // Mock user per evitare errori
  return next();

  /* CODICE ORIGINALE - Riattiva rimuovendo il return next() sopra
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
  */
};

// Admin authorization
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // ⚠️ AUTORIZZAZIONE TEMPORANEAMENTE DISABILITATA PER SVILUPPO
    console.log('⚠️  Authorization middleware bypassed - development mode');
    return next();

    /* CODICE ORIGINALE - Riattiva rimuovendo il return next() sopra
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
    */
  };
};
