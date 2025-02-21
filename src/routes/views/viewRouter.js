const express = require('express');
const ProductManager = require('../../managers/ProductManager');
const router = express.Router();

router.get("/products", async (request, response) => {
    try {
        const products = await ProductManager.getProducts();
        response.render("products", {
            products,
            error: false
        });
    }
    catch(error) {
        response.render("products", {
            products: [],
            error: true
        });
    }
});
router.get("/realTimeProducts", async (request, response) => {
    response.render("realTimeProducts");
});

module.exports = router;