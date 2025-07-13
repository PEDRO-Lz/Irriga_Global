import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: () => new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    }), format.json()
  ),

  transports: [
    new transports.File({ filename: 'logs/info.log', level: 'info' }),
  ]
});

export function logRequest(req, res, mensagem, extra = {}) {
  logger.info({
    timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    mensagem,
    method: req.method,
    caminho: req.originalUrl,
    resposta: res.statusCode,
    nomeUser: req.user?.name || req.body?.name || null,
    hostname: req.hostname,
    ip: req.headers['x-forwarded-for'] || req.ip,
    userId: extra.userId || req.user?.id,
    pivotId: extra.pivotId || req.params?.pivotId || req.body?.pivotId,
    irrigationId: extra.irrigationId,
    adminId: extra.adminId,
    token: extra.token,
  });
}

export default logger;