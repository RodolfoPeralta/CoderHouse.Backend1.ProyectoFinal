const express = require('express');
const ProductManagerController = require('./controllers/ProductManagerController');
const CartManagerController = require('./controllers/CartManagerController');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Products
app.get('/api/products', async (request, response) => ProductManagerController.getProducts(request, response));
app.get('/api/products/:id', async (request, response) => ProductManagerController.getProductById(request, response));
app.post('/api/products', async (request, response) => ProductManagerController.addProduct(request, response));
app.put('/api/products/:id', async (request, response) => ProductManagerController.updateProduct(request, response));
app.delete('/api/products/:id', async (request, response) => ProductManagerController.deleteProduct(request,response));

// Carts
app.get('/api/carts', async (request,response) => CartManagerController.getCarts(request, response));
app.get('/api/carts/:id', async (request, response) => CartManagerController.getCartById(request, response));
app.post('/api/carts', async (request, response) => CartManagerController.createCart(request, response));
app.post('/api/carts/:cid/product/:pid', async (request, response) => CartManagerController.addProductToCart(request, response));
app.delete('/api/carts/:id', async (request, response) => CartManagerController.deleteCartById(request, response));

module.exports = app;