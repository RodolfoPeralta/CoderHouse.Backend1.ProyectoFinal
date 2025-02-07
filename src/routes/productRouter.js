const express = require('express');
const router = express.Router();
const ProductManagerController = require('../controllers/ProductManagerController');

router.get('/', async (request, response) => ProductManagerController.getProducts(request, response));
router.get('/:id', async (request, response) => ProductManagerController.getProductById(request, response));
router.post('/', async (request, response) => ProductManagerController.addProduct(request, response));
router.put('/:id', async (request, response) => ProductManagerController.updateProduct(request, response));
router.delete('/:id', async (request, response) => ProductManagerController.deleteProduct(request,response));

module.exports = router;