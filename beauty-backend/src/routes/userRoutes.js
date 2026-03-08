import { Router } from 'express';
import { register, login } from '../controllers/userController';

const router = Router();

//Public routes 
router.post('/register', register);
router.post('/login', login);

export default router 
