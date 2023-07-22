import express from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController.js';
import { verifyUser } from '../middleware/authUser.js';

const router = express.Router();

router.get('/users', verifyUser, getUsers)
router.get('/user/:id', verifyUser, getUserById)
router.post('/users', verifyUser, createUser)
router.patch('/user/:id', verifyUser, updateUser)
router.delete('/user/:id', verifyUser, deleteUser)

export default router;