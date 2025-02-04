const CartManager = require('../models/CartManager');

class CartManagerController {

    static async createCart(request, response) {
        return response.status(201).json(await CartManager.createCart());
    }

    static async addProductToCart(request, response) {
        const cid = Number(request.params.cid);
        const pid = Number(request.params.pid);

        try {
            const cart = await CartManager.addProductToCart(cid, pid);
            return response.status(201).json(cart);
        }
        catch(error) {
            return response.status(404).json({message: error});
        }
    }

    static async getCartById(request, response) {
        const cid = Number(request.params.id);
        const cart = await CartManager.getCartById(cid);

        if(!cart) {
            return response.status(404).json(`message: cart with id ${cid} not founded.`);
        }

        return response.status(200).json(cart);
    }

    static async getCarts(request, response) {
        const carts = await CartManager.getCarts();

        if(!carts || carts == null) {
            return response.status(404);
        }

        return response.status(200).json(carts); 
    }
}

module.exports = CartManagerController;