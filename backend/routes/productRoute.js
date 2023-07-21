import express from 'express';
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getProduct);
router.get('/product/:id', getProductById);
router.post('/products', addProduct);
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

export default router;