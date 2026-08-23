const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["x-access-token"];

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    const secret = process.env.JWT_SECRET || "stock_trading_jwt_secret_key_2026";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = { verifyToken };
