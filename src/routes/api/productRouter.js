const express = require('express');
const router = express.Router();
const ProductManagerController = require('../../controllers/ProductManagerController');

router.get('/', async (request, response) => await ProductManagerController.getProducts(request, response));
router.get('/:id', async (request, response) => await ProductManagerController.getProductById(request, response));
router.post('/', async (request, response) => await ProductManagerController.addProduct(request, response));
router.put('/:id', async (request, response) => await ProductManagerController.updateProduct(request, response));
router.delete('/:id', async (request, response) => await ProductManagerController.deleteProduct(request,response));

module.exports = router;