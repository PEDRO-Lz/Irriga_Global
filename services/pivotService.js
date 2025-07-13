import { Pivot } from '../models/Pivot.js';

export const pivots = [];

export function criarPivot({ description, flowRate, minApplicationDepth, userId }) {
  const novoPivot = new Pivot({ description, flowRate, minApplicationDepth, userId, 
    updatedAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) });
  pivots.push(novoPivot);
  return novoPivot;
}

export function listarPivotsPorUsuario(userId) {
  return pivots.filter(pivot => pivot.userId === userId);
}

export function buscarPivotPorId(userId, pivotId) {
  return pivots.find(pivot => pivot.id === pivotId && pivot.userId === userId);
}

export function atualizarPivot(userId, pivotId, dadosAtualizados) {
  const pivot = pivots.find(pivot => pivot.id === pivotId && pivot.userId === userId);
  if (!pivot) return null;

  if (dadosAtualizados.description !== undefined) {
    pivot.description = dadosAtualizados.description;
  }
  if (dadosAtualizados.flowRate !== undefined) {
    pivot.flowRate = dadosAtualizados.flowRate;
  }
  if (dadosAtualizados.minApplicationDepth !== undefined) {
    pivot.minApplicationDepth = dadosAtualizados.minApplicationDepth;
  }
  pivot.updatedAt = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  return pivot;
}

export function removerPivot(userId, pivotId) {
  const posicao = pivots.findIndex(pivot => pivot.id === pivotId && pivot.userId === userId);
  if (posicao === -1) return false;
  pivots.splice(posicao, 1);
  return true;
}