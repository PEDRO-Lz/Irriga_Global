import jwt from 'jsonwebtoken';
import { cadastrarUser, autenticarUser, atualizarPerfilUser, trocarSenha } from '../services/userService.js';
import { logRequest } from '../logs/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'segredojwt';

export async function cadastro(req, res) {
  try {
    const { name, userName, password } = req.body;
    
    if (!name || !userName || !password) {
      return res.status(400).json({ message: 'Nome, nome de usuário e senha são obrigatórios' });
    }

    const novoUser = await cadastrarUser({ name, userName, password });

    logRequest(req, res, 'Usuário criado', { userId: novoUser.id });
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: { id: novoUser.id, name: novoUser.name, userName: novoUser.userName }
    });

  } catch (err) {
    logRequest(req, res, 'ERRO ao criar usuário', { userId: null });
    res.status(400).json({ message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ message: 'Nome e senha são obrigatórios' });
    }

    const user = await autenticarUser({ name, password });

    const token = jwt.sign(
      { id: user.id, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    logRequest(req, res, 'Login bem-sucedido', { userId: user.id });
    res.status(200).json({
      token,
    });

  } catch (err) {
    logRequest(req, res, 'ERRO ao fazer login', { userId: null });
    res.status(400).json({ message: err.message });
  }
}

export async function atualizarPerfil(req, res) {
  try {
    const userId = req.user?.id;
    const { name, userName } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Não autenticado' });
    }

    const user = atualizarPerfilUser(userId, { name, userName });

    logRequest(req, res, 'Perfil atualizado', { userId: user.id, userName: user.userName });
    res.status(200).json({ message: 'Perfil atualizado com sucesso', user: { id: user.id, name: user.name, userName: user.userName } });

  } catch (err) {
    logRequest(req, res, 'ERRO ao atualizar perfil', { userId: req.user?.id });
    res.status(400).json({ message: err.message });
  }
}

export async function alterarSenha(req, res) {
  try {
    const userId = req.user?.id;
    const { novaSenha } = req.body;

    if (!userId || !novaSenha) {
      return res.status(400).json({ message: 'Nova senha obrigatória' });
    }

    await trocarSenha(userId, novaSenha);

    logRequest(req, res, 'Senha alterada com sucesso', { userId });
    res.status(200).json({ message: 'Senha alterada com sucesso' });

  } catch (err) {
    logRequest(req, res, 'ERRO ao alterar senha');
    res.status(400).json({ message: err.message });
  }
}