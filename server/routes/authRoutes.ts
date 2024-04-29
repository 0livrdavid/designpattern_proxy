import express from 'express';
import * as authController from '../controllers/authControllers';

const router = express.Router();

router.post('/login', authController.login);
router.get('/verify', authController.verifySession);

export default router;
