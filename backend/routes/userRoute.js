import express from 'express';
import { createUser, getUserById, getUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers)
router.get('/user/:id', getUserById)
router.post('/users', createUser)

export default router;