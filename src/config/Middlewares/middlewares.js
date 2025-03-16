const express = require("express");

function configureMiddlewares(app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
}

module.exports = configureMiddlewares;