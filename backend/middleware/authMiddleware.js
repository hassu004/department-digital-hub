
const jwt = require("jsonwebtoken");


// Verify JWT token
function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // Check whether token exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided."
      });
    }

    // Get token from:
    // Authorization: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Invalid token format."
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store user information
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
}


// Check user role
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission."
      });
    }

    next();
  };
}


module.exports = {
  authenticateToken,
  authorizeRoles
};

