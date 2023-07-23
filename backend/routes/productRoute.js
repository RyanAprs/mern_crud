import express from 'express';
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/productController.js';
import { verifyUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/products', verifyUser,getProduct);
router.get('/product/:id', getProductById);
router.post('/products', addProduct);
router.patch('/product/:id', updateProduct);
router.delete('/product/:id',deleteProduct);

export default router;