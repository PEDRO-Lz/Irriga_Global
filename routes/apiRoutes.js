import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { cadastro, login } from '../controllers/userController.js';
import { criarp, listarp, obterp, atualizarp, removerp } from '../controllers/pivotController.js';
import { criari, listari, obteri, removeri } from '../controllers/irrigationController.js';
// ADICIONAIS
import { atualizarPerfil, alterarSenha } from '../controllers/userController.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { loginAdmin, listarPivots, listarIrrigations, listarUsers, obterPivot, atualizarAdmin,
         obterIrrigation, obterUser, alterarSenhaDeUser, atualizarPivotAdmin } from '../controllers/adminController.js';
import { logsDoUsuario, logsPorId, logsTodos } from '../controllers/logController.js';
import { authLimiter } from '../middlewares/ratelimiter.js';
//

const router = Router();

router.post('/auth/register', authLimiter, cadastro);
router.post('/auth/login', authLimiter, login);

router.get('/pivots', auth, listarp);
router.get('/pivots/:id', auth, obterp);
router.post('/pivots', auth, criarp);
router.put('/pivots/:id', auth, atualizarp);
router.delete('/pivots/:id', auth, removerp);

router.get('/irrigations', auth, listari);
router.get('/irrigations/:id', auth, obteri);
router.post('/irrigations', auth, criari);
router.delete('/irrigations/:id', auth, removeri);

// ADICIONAIS
router.put('/auth/perfil', auth, atualizarPerfil); 
router.put('/auth/password', auth, alterarSenha);
router.get('/auth/atividade', auth, logsDoUsuario);
router.post('/admin/login', authLimiter, loginAdmin);
router.put('/admin/perfil', authAdmin, atualizarAdmin);
router.put('/admin/users/:id/password', authAdmin, alterarSenhaDeUser);
router.get('/admin/users', authAdmin, listarUsers);
router.get('/admin/users/:id', authAdmin, obterUser);
router.get('/admin/pivots', authAdmin, listarPivots);
router.get('/admin/pivots/:id', authAdmin, obterPivot);
router.put('/admin/pivots/:id', authAdmin, atualizarPivotAdmin);
router.get('/admin/irrigations', authAdmin, listarIrrigations);
router.get('/admin/irrigations/:id', authAdmin, obterIrrigation);
router.get('/admin/logs/user/:id', authAdmin, logsPorId);
router.get('/admin/logs/all', authAdmin, logsTodos);
//

export default router;