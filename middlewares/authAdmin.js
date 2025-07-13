import jwt from 'jsonwebtoken';
import { logRequest } from '../logs/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'segredojwt';

export const authAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    logRequest(req, res, 'ADMIN Token não fornecido', { token });
    return res.status(401).json({ message: 'Token não fornecido!' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err || user.role !== 'admin') {
      logRequest(req, res, 'ADMIN Token inválido', { token });
      return res.status(403).json({ message: 'Acesso restrito para administradores!' });
    }
    req.user = user;
    next();
  });
};