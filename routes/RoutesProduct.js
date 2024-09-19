const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.post('/', productController.addProduct);
router.get('/', productController.showProducts);
router.get('/:id', productController.findClient);
//router.put('/:id', productController.modifyProduct);
router.patch('/:id', productController.editProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;