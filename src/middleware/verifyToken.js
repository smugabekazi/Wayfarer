import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const verifyToken = (req, res, next) => {
  const token = req.headers['access-token'] || req.body['access-token'] || null;
  if (!token) {
    return res.status(401).json({
      error: 'unauthorized access',
      status:401,
    });
  }
  jwt.verify(token, process.env.secretOrKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        status:500,
        error: 'failed to authenticate token',
      });
    }
    req.userId = decoded.userId || null;
    req.userType = decoded.userType || null;
    next();
    return true;
  });
  return true;
};
export default verifyToken;