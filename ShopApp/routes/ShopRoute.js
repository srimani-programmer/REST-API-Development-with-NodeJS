const express = require('express');
const { fetchProducts, addProduct, updateProductItem, deleteProductItem } = require('../controllers/ShopController')

const router = express.Router();

router.get('/', fetchProducts);

router.post('/', addProduct);

router.patch('/:id', updateProductItem)

router.delete('/:id', deleteProductItem);

module.exports = router;