// server/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if (email === 'admin@gmail.com' && password === 'admin') {
            const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'Nenhum usuário encontrado com esse email' });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: 'Senha está incorreta' });
        }

        const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const verifySession = (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1] || '';

    if (!token) {
        return res.status(401).json({ error: 'Nenhum token providenciado' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Falha ao autenticar token' });
        }

        res.json({ message: 'Sessão é válida', user: decoded });
    });
};
