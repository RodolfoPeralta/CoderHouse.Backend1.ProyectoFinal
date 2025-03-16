const express = require('express');
const ProductManager = require('../../managers/ProductManager');
const CartManager = require('../../managers/CartManager');
const router = express.Router();

router.get("/products", async (request, response) => {
    try {
        const products = await ProductManager.getProducts();
        response.render("products", {
            products,
            isCart: false,
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

router.get("/products/:pid", async (request, response) => {
    try {
        const pid = request.params.pid;
        const product = await ProductManager.getProductById(pid);

        response.render("productDetails", {
            product,
            error: false
        });
    }
    catch(error) {
        response.render("productDetails", {
            product: {},
            error: true
        });
    }
})

router.get("/carts", async (request, response) => {
    try {
        const carts = await CartManager.getCarts(false);
        response.render("carts", {
            carts,
            error: false
        });
    }
    catch(error) {
        response.render("carts", {
            carts: [],
            error: true
        });
    }
})

router.get("/carts/:cid", async (request, response) => {
    try {
        const cid = request.params.cid;

        if(!cid) {
            throw new Error();
        }

        // Gets a cart by id using products population
        const cart = await CartManager.getCartById(cid, true);

        const products = cart.products.map(i => i.product);

        if(!cart) {
            throw new Error();
        }

        response.render("cartProductList", {
            products: products,
            error: false
        });
    }
    catch(error) {
        response.render("cartProductList", {
            products: [],
            error: true
        });
    }
})

router.get("/realTimeProducts", async (request, response) => {
    response.render("realTimeProducts");
});

module.exports = router;