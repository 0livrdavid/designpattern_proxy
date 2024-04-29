import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', authMiddleware);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

