import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export const users = [];

export async function cadastrarUser({ name, userName, password }) {
  if (!name || !userName || !password) {
    throw new Error('Nome, nome de usuário e senha são obrigatórios');
  }
  if (name.length < 3 || name.length > 20) {
    throw new Error('Nome deve ter entre 3 e 20 caracteres');
  }
  if (!/^[a-zA-Z0-9]+$/.test(name)) {
    throw new Error('Nome só pode conter letras e números');
  }
  if (userName.length < 3 || userName.length > 20) {
    throw new Error('Nome de usuário deve ter entre 3 e 20 caracteres');
  }
  if (password.length < 3) {
    throw new Error('Senha deve ter pelo menos 3 caracteres');
  }

  const userExists = users.find((user) => user.name === name);
  if (userExists) {
    throw new Error('Usuário já cadastrado');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ name, passwordHash, userName });

  users.push(newUser);

  return newUser;
}

export async function autenticarUser({ name, password }) {
  const user = users.find((user) => user.name === name);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Senha inválida');
  }

  return user;
}

export function atualizarPerfilUser(userId, { name, userName }) {
  const user = users.find(user => user.id === userId);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (userName) user.userName = userName;

  const nameExists = users.find(u => u.name === name && u.id !== userId);
  if (nameExists) throw new Error('Nome de usuário já existe');
  else {
    user.userName = userName;
  }

  return user;
}

export async function trocarSenha(userId, novaSenha) {
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error('Usuário não encontrado');

  user.passwordHash = await bcrypt.hash(novaSenha, 10);

  return true;
}