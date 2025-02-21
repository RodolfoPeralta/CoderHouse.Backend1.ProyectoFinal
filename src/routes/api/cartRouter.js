const express = require('express');
const router = express.Router();
const CartManagerController = require('../../controllers/CartManagerController');

router.get('/', async (request,response) => CartManagerController.getCarts(request, response));
router.get('/:id', async (request, response) => CartManagerController.getCartById(request, response));
router.post('/', async (request, response) => CartManagerController.createCart(request, response));
router.post('/:cid/product/:pid', async (request, response) => CartManagerController.addProductToCart(request, response));
router.delete('/:id', async (request, response) => CartManagerController.deleteCartById(request, response));

module.exports = router;