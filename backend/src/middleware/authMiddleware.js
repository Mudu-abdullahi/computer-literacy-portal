
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =====================================
// 1. AUTHENTICATION MIDDLEWARE
// =====================================

exports.protect = async (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;

    // Check whether token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Check JWT secret configuration
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from environment variables.");
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in MongoDB
    const user = await User.findById(decoded.id);

    // Check user existence and account status
    if (!user || user.status !== "active") {
      return res.status(401).json({
        success: false,
        message: "Your account is unavailable or inactive.",
      });
    }

    // Attach authenticated user to request
    req.user = user;

    // Continue to next middleware or controller
    next();

  } catch (error) {

    // Handle invalid or expired tokens
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token.",
      });
    }

    console.error("Authentication error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};


// =====================================
// 2. ROLE-BASED AUTHORIZATION
// =====================================

exports.authorize = (...roles) => {
  return (req, res, next) => {

    // Check authenticated user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // Check user permissions
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource.",
      });
    }

    // Permission granted
    next();
  };
};
