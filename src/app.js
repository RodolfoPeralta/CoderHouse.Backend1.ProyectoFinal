const express = require('express');
const ProductManagerController = require('./controllers/ProductManagerController');
const CartManagerController = require('./controllers/CartManagerController');

const app = express();

// Middlewares
app.use(express.json());

// Products
app.get('/api/products', (request, response) => ProductManagerController.getProducts(request, response));
app.get('/api/products/:id', (request, response) => ProductManagerController.getProductById(request, response));
app.post('/api/products', (request, response) => ProductManagerController.addProduct(request, response));
app.put('/api/products/:id', (request, response) => ProductManagerController.updateProduct(request, response));
app.delete('/api/products/:id', (request, response) => ProductManagerController.deleteProduct(request,response));

// Carts
app.get('/api/carts', (request,response) => CartManagerController.getCarts(request, response));
app.get('/api/carts/:id', (request, response) => CartManagerController.getCartById(request, response));
app.post('/api/carts', (request, response) => CartManagerController.createCart(request, response));
app.post('/api/carts/:cid/product/:pid', (request, response) => CartManagerController.addProductToCart(request, response));

module.exports = app;