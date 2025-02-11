const express = require('express');
const routes = require('./routes/index');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api', routes);

module.exports = app;