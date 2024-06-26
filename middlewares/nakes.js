//create auth middleware
const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Auth failed',
    });
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    if (decoded.data.user.level === 'nakes') {
      req.auth = decoded;
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'Auth failed',
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: 'error',
      message: 'Auth failed',
    });
  }
  return next();
};

module.exports = verifyToken;
