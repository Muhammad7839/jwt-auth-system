// Purpose: verify JWT Bearer tokens before protected routes run.

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Protected routes require an Authorization header in this format:
  // Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token is required." });
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not configured." });
    }

    // jwt.verify checks the signature and expiration time before returning data.
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

module.exports = verifyToken;

