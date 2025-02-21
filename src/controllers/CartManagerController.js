const CartManager = require('../managers/CartManager');

class CartManagerController {

    static async createCart(request, response) {
        try {
            return response.status(201).json(await CartManager.createCart());
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    static async addProductToCart(request, response) {
        try {
            const cid = Number(request.params.cid);
            const pid = Number(request.params.pid);

            const cart = await CartManager.addProductToCart(cid, pid);

            if(!cart) {
                return response.status(404).json({Message: `cart with id ${cid} not founded.`});
            }

            return response.status(201).json(cart);
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    static async getCartById(request, response) {
        try {
            const cid = Number(request.params.id);
            const cart = await CartManager.getCartById(cid);

            if(!cart) {
                return response.status(404).json({Message: `cart with id ${cid} not founded.`});
            }

            return response.status(200).json(cart);
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    static async getCarts(request, response) {
        try {
            const carts = await CartManager.getCarts();
            return response.status(200).json(carts);
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    static async deleteCartById(request, response) {
        try {
            const id = Number(request.params.id);

            if(await CartManager.deleteCartById(id)) {
                return response.status(200).json({Message: "Product deleted."});
            }
            else {
                return response.status(404).json({Message: `product with id ${id} not founded.`});
            }
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }
}

module.exports = CartManagerController;