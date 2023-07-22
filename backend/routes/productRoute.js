import express from 'express';
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/productController.js';
import { verifyUser } from '../middleware/authUser.js';

const router = express.Router();

router.get('/products', verifyUser ,getProduct);
router.get('/product/:id', verifyUser, getProductById);
router.post('/products', verifyUser, addProduct);
router.patch('/product/:id', verifyUser, updateProduct);
router.delete('/product/:id', verifyUser,deleteProduct);

export default router;