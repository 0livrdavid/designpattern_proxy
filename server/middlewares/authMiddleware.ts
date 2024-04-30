import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { env } from '../env';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Invalid JWT'})
    }
  
    const [, token] = authHeader.split(' ');
  
    try {
      verify(token, env.JWT_SECRET);
      return next();
    } catch {
        return res.status(401).json({ message: 'Invalid JWT'})
    }
};
