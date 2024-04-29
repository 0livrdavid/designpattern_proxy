import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] || '';

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: `Não autorizado: ${err.message}` });
        }

        if (typeof decoded === 'object' && decoded !== null) {
            (req as any).user = decoded as { [key: string]: any };
            next();
        } else {
            return res.status(401).json({ error: 'Token inválido' });
        }
    });
};
