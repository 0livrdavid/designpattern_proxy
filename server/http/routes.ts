import { Router } from 'express'
import { register } from './controller/register'
import { authenticate } from './controller/authenticate'
import { authMiddleware } from '../middlewares/authMiddleware'
import { getUsers } from './controller/getUsers'

const router = Router()

router.post('/created', register)
router.post('/session', authenticate)
router.get('/users', authMiddleware, getUsers)

export default router
