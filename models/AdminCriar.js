import bcrypt from 'bcrypt';
import { Admin } from '../models/Admin.js';
import { admins } from '../services/adminService.js';

export async function criarAdmin(){
    const name = 'admin';
    const password = 'admin';
    const passwordHash = await bcrypt.hash(password, 10);
    const novoAdmin = new Admin({ name, passwordHash });
    
    admins.push(novoAdmin);
    console.log('Admin padrão criado');
}