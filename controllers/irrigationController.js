import { criarIrrigation, listarIrrigationsPorUsuario, buscarIrrigationPorId, removerIrrigation } from '../services/irrigationService.js';
import { logRequest } from '../logs/logger.js';

export function criari(req, res) {
  try {
    const applicationAmount = Number(req.body.applicationAmount);
    const pivotId = req.body.pivotId;
    const userId = req.user?.id;

    if (!pivotId || !applicationAmount || !userId) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios: valor de irrigação em mm e ID do pivô' });
    }

    const novaIrrigation = criarIrrigation({ pivotId, applicationAmount, userId });

    logRequest(req, res, 'Irrigação criada', { irrigationId: novaIrrigation.id, pivotId: novaIrrigation.pivotId });
    res.status(201).json({
      message: 'Registro de irrigação criado com sucesso',
      irrigation: novaIrrigation
    });

  } catch (err) {
    logRequest(req, res, 'ERRO ao criar Irrigação', { irrigationId: req.body.irrigationId });
    res.status(400).json({ message: err.message });
  }
}

export function listari(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const irrigations = listarIrrigationsPorUsuario(userId);

    res.status(200).json({ irrigations });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export function obteri(req, res) {
  try {
    const userId = req.user?.id;
    const irrigationId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const irrigation = buscarIrrigationPorId(userId, irrigationId);

    if (!irrigation) {
      return res.status(404).json({ message: 'Registro de irrigação não encontrado' });
    }

    res.status(200).json({ irrigation });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export function removeri(req, res) {
  try {
    const userId = req.user?.id;
    const irrigationId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const removido = removerIrrigation(userId, irrigationId);

    if (!removido) {
      logRequest(req, res, 'ERRO ao remover Irrigação', { irrigationId });
      return res.status(404).json({ message: 'Registro de irrigação não encontrado' });
    }

    logRequest(req, res, 'Irrigação Removida', { irrigationId, pivotId: removido.pivotId });
    res.status(200).json({ message: 'Registro de irrigação removido com sucesso' });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}