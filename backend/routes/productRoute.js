const express = require ('express');
const { addProduct, deleteProduct, getProduct, getProductById, updateProduct } = require ('../controllers/productController.js');
const requireAuth = require('../middleware/requireAuth.js');

const router = express.Router();

router.use(requireAuth);

router.get('/',getProduct);
router.get('/:id', getProductById);
router.post('/', addProduct);
router.patch('/:id', updateProduct);
router.delete('/:id',deleteProduct);

module.exports = router;