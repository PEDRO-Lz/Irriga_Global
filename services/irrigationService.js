import { Irrigation } from '../models/Irrigation.js';
import { pivots } from './pivotService.js';

export const irrigations = [];

export function criarIrrigation({ pivotId, applicationAmount, userId }) {
  const pivot = pivots.find(pivot => pivot.id === pivotId && pivot.userId === userId);
  if (!pivot) {
    throw new Error('Pivô não encontrado');
  }

  const novaIrrigation = new Irrigation({
    pivotId,
    applicationAmount,
    irrigationDate: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    userId
  });

  irrigations.push(novaIrrigation);
  return novaIrrigation;
}

export function listarIrrigationsPorUsuario(userId) {
  return irrigations.filter(irrigation => irrigation.userId === userId);
}

export function buscarIrrigationPorId(userId, irrigationId) {
  return irrigations.find(irrigation => irrigation.id === irrigationId && irrigation.userId === userId);
}

export function removerIrrigation(userId, irrigationId) {
  const posicao = irrigations.findIndex(irrigation => irrigation.id === irrigationId && irrigation.userId === userId);
  if (posicao === -1) return false;
  irrigations.splice(posicao, 1);
  return true;
}