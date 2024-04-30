import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middlewares/authMiddleware';
import { authorizationMiddleware } from './middlewares/authorizationMiddleware'; // Assegure-se de importar corretamente

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Rotas de autenticação não devem ter o authMiddleware aplicado
app.use('/api/auth', authRoutes);

// Aplicar authMiddleware a todas as outras rotas API que exigem autenticação
app.use('/api', authMiddleware, authorizationMiddleware);

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
