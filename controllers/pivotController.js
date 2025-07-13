import { criarPivot, listarPivotsPorUsuario, buscarPivotPorId, atualizarPivot, removerPivot } from '../services/pivotService.js';
import { logRequest } from '../logs/logger.js';

export function criarp(req, res) {
  try {
    const { description } = req.body;
    const flowRate = Number(req.body.flowRate);
    const minApplicationDepth = Number(req.body.minApplicationDepth);
    const userId = req.user?.id;

    if (!description || !flowRate || !minApplicationDepth || !userId) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios: descrição, vazão e lâmina mínima aplicada' });
    }

    const novoPivot = criarPivot({ description, flowRate, minApplicationDepth, userId });

    logRequest(req, res, 'Pivô Criado', { pivotId: novoPivot.id });
    res.status(201).json({
      message: 'Pivô criado com sucesso',
      pivot: novoPivot
    });

  } catch (err) {
    logRequest(req, res, 'ERRO ao criar Pivô', { pivotId: novoPivot.id });
    res.status(400).json({ message: err.message });
  }
}

export function listarp(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const pivots = listarPivotsPorUsuario(userId);
    res.status(200).json({ pivots });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export function obterp(req, res) {
  try {
    const userId = req.user?.id;
    const pivotId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const pivot = buscarPivotPorId(userId, pivotId);

    if (!pivot) {
      return res.status(404).json({ message: 'Pivô não encontrado' });
    }

    res.status(200).json({ pivot });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export function atualizarp(req, res) {
  try {
    const userId = req.user?.id;
    const pivotId = req.params.id;
    const { description, flowRate, minApplicationDepth } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const pivotAtualizado = atualizarPivot(userId, pivotId, { description, flowRate, minApplicationDepth });

    if (!pivotAtualizado) {
      logRequest(req, res, 'Erro ao atualizar Pivô', { pivotId });
      return res.status(404).json({ message: 'Pivô não encontrado' });
    }

    logRequest(req, res, 'Pivô Atualizado', { pivotId });
    res.status(200).json({ message: 'Pivô atualizado com sucesso', pivot: pivotAtualizado });

  } catch (err) {
    logRequest(req, res, 'ERRO ao atualizar Pivô', { pivotId });
    res.status(400).json({ message: err.message });
  }
}

export function removerp(req, res) {
  try {
    const userId = req.user?.id;
    const pivotId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const removido = removerPivot(userId, pivotId);

    if (!removido) {
      logRequest(req, res, 'ERRO ao remover Pivô', { pivotId });
      return res.status(404).json({ message: 'Pivô não encontrado' });
    }

    logRequest(req, res, 'Pivô Removido', { pivotId });
    res.status(200).json({ message: 'Pivô removido com sucesso' });

  } catch (err) {
    logRequest(req, res, 'ERRO ao remover Pivô', { pivotId });
    res.status(400).json({ message: err.message });
  }
}