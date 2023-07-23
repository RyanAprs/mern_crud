import express from 'express';
import { Login, Logout, Register } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', Login)
router.post('/register', Register)
router.delete('/logout', Logout)


export default router;