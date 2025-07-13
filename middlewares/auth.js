import jwt from 'jsonwebtoken';
import { logRequest } from '../logs/logger.js';

const JWT_SECRET = 'segredojwt';

export const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    logRequest(req, res, 'Token não fornecido', { token });
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      logRequest(req, res, 'Token inválido', { token });
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};