import jwt from 'jsonwebtoken';
import {
    listarTodosPivots, listarTodasIrrigations, listarTodosUsers, obterPivotPorId, atualizarPerfilAdmin,
    obterIrrigationPorId, obterUserPorId, autenticarAdmin, trocarSenhaDeUser, atualizarPivotPorId
} from '../services/adminService.js';
import { logRequest } from '../logs/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'segredojwt';

export async function loginAdmin(req, res) {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ message: 'Nome e senha são obrigatórios' });
        }

        const admin = await autenticarAdmin({ name, password });
        if (!admin) {
            logRequest(req, res, 'ERRO ao fazer login ADMIN', { nomeUser: name });
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { id: admin.id, name: admin.name, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        logRequest(req, res, 'Login ADMIN bem-sucedido', { userId: admin.id });
        res.status(200).json({
            message: 'Login ADMIN bem-sucedido',
            token,
            admin: { id: admin.id, name: admin.name }
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function alterarSenhaDeUser(req, res) {
    try {
        const { id } = req.params;
        const { novaSenha } = req.body;

        if (!id || !novaSenha) {
            return res.status(400).json({ message: 'ID e nova senha são obrigatórios' });
        }

        await trocarSenhaDeUser(id, novaSenha);

        logRequest(req, res, 'Senha do usuário alterada por ADMIN', { userId: id, adminId: req.user.id });
        res.status(200).json({ message: 'Senha do usuário alterada por ADMIN' });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export function listarUsers(req, res) {
    res.status(200).json({ users: listarTodosUsers() });
}

export function obterUser(req, res) {
    const user = obterUserPorId(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json({ user });
}

export function listarPivots(req, res) {
    res.status(200).json({ pivots: listarTodosPivots() });
}

export function obterPivot(req, res) {
    const pivot = obterPivotPorId(req.params.id);
    if (!pivot) return res.status(404).json({ message: 'Pivô não encontrado' });
    res.status(200).json({ pivot });
}

export function listarIrrigations(req, res) {
    res.status(200).json({ irrigations: listarTodasIrrigations() });
}

export function obterIrrigation(req, res) {
    const irrigation = obterIrrigationPorId(req.params.id);
    if (!irrigation) return res.status(404).json({ message: 'Irrigação não encontrada' });
    res.status(200).json({ irrigation });
}

export function atualizarPivotAdmin(req, res) {
    try {
        const pivotId = req.params.id;
        const { description, flowRate, minApplicationDepth } = req.body;

        const pivotAtualizado = atualizarPivotPorId(pivotId, { description, flowRate, minApplicationDepth });

        if (!pivotAtualizado) {
            logRequest(req, res, 'Erro ao atualizar Pivô (admin)', { pivotId });
            return res.status(404).json({ message: 'Pivô não encontrado' });
        }

        logRequest(req, res, 'Pivô Atualizado por ADMIN', { pivotId, adminId: req.user.id });
        res.status(200).json({ message: 'Pivô atualizado com sucesso', pivot: pivotAtualizado });
    } catch (err) {
        logRequest(req, res, 'ERRO ao atualizar Pivô (admin)', { pivotId: req.params.id });
        res.status(400).json({ message: err.message });
    }
}

export async function atualizarAdmin(req, res) {
    try {
        const adminId = req.user?.id;
        const { name } = req.body;
        const novaSenha = req.body?.novaSenha;

        if (!adminId) {
            return res.status(401).json({ message: 'Não autenticado' });
        }

        await atualizarPerfilAdmin(adminId, name, novaSenha);

        logRequest(req, res, 'Perfil ADMIN atualizado', { adminId });
        res.status(200).json({ message: 'Perfil ADMIN atualizado com sucesso' });

    } catch (error) {
        logRequest(req, res, 'ERRO ao atualizar perfil ADMIN', { adminId: req.user?.id });
        res.status(400).json({ message: error.message });
    }
}