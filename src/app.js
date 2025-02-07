const express = require('express');
const cartRouter = require('./routes/cartRouter');
const productRouter = require('./routes/productRouter');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes

// Products
app.use('/api/products', productRouter);

// Carts
app.use('/api/carts', cartRouter);

module.exports = app;