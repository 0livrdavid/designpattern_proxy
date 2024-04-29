import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { authMiddleware } from './authMiddleware';
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const userId = req.user.id;
    const path = req.path;

    try {
        const access = await prisma.userAccess.findFirst({
            where: {
                userId: userId,
                page: path
            }
        });

        if (!access) {
            return res.status(403).json({ error: 'Acesso negado para esta página' });
        }

        next();
    } catch (error) {
        console.error('Error checking permissions:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao verificar permissões' });
    }
};

// Uso do middleware de autorização após o middleware de autenticação
app.use('/api', authMiddleware, authorizationMiddleware);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

