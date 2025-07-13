import fs from 'fs';
import path from 'path';

const logPath = path.join(process.cwd(), 'logs/info.log');

export function getLogsByUserId(userId) {
    const lines = fs.readFileSync(logPath, 'utf-8').split('\n').filter(Boolean);
    return lines
        .map(line => {
            try {
                return JSON.parse(line).message;
            } catch {
                return null;
            }
        })
        .filter(log => log && log.userId === userId);
}

export function getAllLogs() {
    const lines = fs.readFileSync(logPath, 'utf-8').split('\n').filter(Boolean);
    return lines
        .map(line => {
            try {
                return JSON.parse(line).message;
            } catch {
                return null;
            }
        })
        .filter(Boolean);
}