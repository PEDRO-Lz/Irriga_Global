import bcrypt from 'bcrypt';
import { pivots } from './pivotService.js';
import { irrigations } from './irrigationService.js';
import { users } from './userService.js';

export const admins = [];

export async function autenticarAdmin({ name, password }) {
    const admin = admins.find(admin => admin.name === name);
    if (!admin) return null;

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return null;

    return admin;
}

export async function trocarSenhaDeUser(userId, novaSenha) {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Usuário não encontrado');

    user.passwordHash = await bcrypt.hash(novaSenha, 10);
    return true;
}

export function listarTodosPivots() {
    return pivots;
}

export function listarTodasIrrigations() {
    return irrigations;
}

export function listarTodosUsers() {
    return users.map(user => ({
        id: user.id,
        name: user.name,
        createdAt: user.createdAt
    }));
}

export function obterPivotPorId(pivotId) {
    return pivots.find(pivot => pivot.id === pivotId);
}

export function obterIrrigationPorId(irrigationId) {
    return irrigations.find(irrigation => irrigation.id === irrigationId);
}

export function obterUserPorId(userId) {
    return users.find(user => user.id === userId);
}

export function atualizarPivotPorId(pivotId, dadosAtualizados) {
    const pivot = pivots.find(pivot => pivot.id === pivotId);
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

export async function atualizarPerfilAdmin(adminId, name, password) {
    const admin = admins.find(admin => admin.id === adminId);
    if (!admin) throw new Error('Admin não encontrado');

    const nameExists = admins.find(u => u.name === name && u.id !== adminId);
    if (nameExists) throw new Error('Nome de Admin já existe');

    if (password) admin.passwordHash = await bcrypt.hash(password, 10);

    return admin;
}