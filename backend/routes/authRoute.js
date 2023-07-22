import express from 'express';
import { Login, Logout, Register } from '../controllers/authController.js';

const router = express.Router();

router.post('/users/login', Login)
router.post('/users/register', Register)
router.delete('/users/logout', Logout)


export default router;