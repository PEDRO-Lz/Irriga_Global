import rateLimit from 'express-rate-limit';
import { logRequest } from '../logs/logger.js';

export const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 50, // 50 requisições por minuto
    message: { message: 'Muitas tentativas, tente novamente em 1 minuto.' },
    handler: (req, res, next) => {
        logRequest(req, res, 'Rate limit atingido');
        res.status(429).json({ message: 'Muitas tentativas, tente novamente em 1 minuto.' });
    }
});