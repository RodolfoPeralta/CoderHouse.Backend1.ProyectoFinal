const express = require('express');
const ProductManagerController = require('./controllers/ProductManagerController');

const app = express();

// Middlewares
app.use(express.json());

app.get('/api/products', (request, response) => ProductManagerController.getProducts(request, response));

app.get('/api/products/:id', (request, response) => ProductManagerController.getProductById(request, response));

app.post('/api/products', (request, response) => ProductManagerController.addProduct(request, response));

module.exports = app;