const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({ msg: 'User not valid' });
  }

  try {
    jwt.verify(token, "Secret_key", (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};