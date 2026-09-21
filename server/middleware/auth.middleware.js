const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Expecting the token to be sent in the Authorization header as "Bearer <token>"

    if (!authHeader) {
      return res.status(401).json({
        message: 'Authentication required.',
      });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format

    if (!token) {
      return res.status(401).json({
        message: 'Authentication required.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using JWT

    req.user = decoded; // Attach the decoded user information to the request object for further use in the route handlers

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token.',
    });
  }
};

module.exports = protect;