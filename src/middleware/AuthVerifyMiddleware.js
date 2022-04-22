const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  let Token = req.headers('token-key');
  jwt.verify(Token, "SecretKey12345", (error, decoded) => {
    if (error) {
      res.status(401).json({ status: 'Unauthorized' });
    } else {
      next();
    }
  });
}