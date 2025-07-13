import fs from 'fs';
import { getLogsByUserId, getAllLogs } from '../logs/logParser.js';

export function listarLogs(req, res) {
    fs.readFile('logs/info.log', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Erro ao ler logs' });
        const logs = data
            .split('\n')
            .filter(l => l.trim())
            .map(l => {
                try { return JSON.parse(l); } catch { return null; }
            })
            .filter(l => l);
        res.status(200).json({ logs });
    });
}

export function logsDoUsuario(req, res) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Não autenticado' });
    const logs = getLogsByUserId(userId);
    res.json({ logs });
}

export function logsPorId(req, res) {
    const { id } = req.params;
    const logs = getLogsByUserId(id);
    res.json({ logs });
}

export function logsTodos(req, res) {
    const logs = getAllLogs();
    res.json({ logs });
}