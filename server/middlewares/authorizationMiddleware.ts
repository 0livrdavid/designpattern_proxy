import { PrismaClient } from '@prisma/client';
import { Response, NextFunction } from 'express';
import express, { Request } from 'express';
import { authMiddleware } from './authMiddleware';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;  // Cast req to any to access user
    if (!user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const userId = user.id;
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
