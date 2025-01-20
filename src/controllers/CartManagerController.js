const CartManager = require('../models/CartManager');

class CartManagerController {

    static createCart(request, response) {
        return response.status(201).json(CartManager.createCart());
    }

    static addProductToCart(request, response) {
        const cid = Number(request.params.cid);
        const pid = Number(request.params.pid);

        try {
            const cart = CartManager.addProductToCart(cid, pid);
            return response.status(201).json(cart);
        }
        catch(error) {
            return response.status(404).json({message: error});
        }
    }

    static getCartById(request, response) {
        const cid = Number(request.params.id);
        const cart = CartManager.getCartById(cid);

        if(!cart) {
            return response.status(404).json(`message: cart with id ${cid} not founded.`);
        }

        return response.status(200).json(cart);
    }

    static getCarts(request, response) {
        const carts = CartManager.getCarts();

        if(!carts) {
            return response.status(404);
        }

        return response.status(200).json(carts); 
    }

}

module.exports = CartManagerController;