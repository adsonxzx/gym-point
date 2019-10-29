import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');

  try {
    const { id } = await jwt.verify(token, authConfig.secrete);
    req.userId = id;
    return next();
  } catch (e) {
    return res.status(400).json({ error: 'Token is invalid!' });
  }
};
