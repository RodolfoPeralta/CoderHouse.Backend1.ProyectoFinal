const CartManager = require('../managers/CartManager');
const MongoDbService = require('../services/MongoDbService');

class CartManagerController {

    // Public Methods

    // Gets carts from db
    static async getCarts(request, response) {
        try {
            const carts = await CartManager.getCarts();

            return response.status(200).json(carts);
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    // Gets carts by id from db
    static async getCartById(request, response) {
        try {
            const cid = request.params.id;
        
            if(!cid) {
                throw new Error("Cart Id parameter is required.");
            }

            const cart = await CartManager.getCartById(cid);

            if(!cart) {
                throw new Error(`Cart with id ${cid} not founded.`);
            }

            return response.status(200).json(cart);
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    // Creates a new cart
    static async createCart(request, response) {
        try {
            return response.status(201).json(await CartManager.createCart());
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    // Adds an specific product to a cart
    static async addProductToCart(request, response) {
        try {
            const cid = request.params.cid;
            const pid = request.params.pid;

            if(!cid) {
                throw new Error("Cart Id parameter is required.");
            }

            if(!pid) {
                throw new Error("Product Id parameter is required.");
            }

            const cart = await CartManager.addProductToCart(cid, pid);

            if(!cart) {
                return response.status(404).json({Message: `Cart with id '${cid}' not founded.`});
            }

            return response.status(201).json(cart);
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    static async updateAllProductsFromCart(request, response) {
        try {
            const cid = request.params.cid;
            const products = request.body;

            if(!cid) {
                throw new Error("Cart Id parameter is required.");
            }

            if(!products) {
                throw new Error("A list of products is required.");
            }

            const updatedCart = await CartManager.updateAllProductsFromCart(products, cid);

            if(!updatedCart) {
                throw new Error(`Error updating cart with id '${cid}'.`);
            }

            return response.status(200).json(updatedCart);
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    static async updateProductFromCartById(request, response) {
        try {
            const cid = request.params.cid;
            const pid = request.params.pid;
            const quantity = request.body;

            if(!cid) {
                throw new Error("Cart Id parameter is required.");
            }

            if(!pid) {
                throw new Error("Product Id parameter is required.");
            }

            if(!quantity) {
                throw new Error("Quantity parameter is required.");
            }

            const updatedCart = await CartManager.updateProductFromCartById(quantity, cid, pid);

            if(!updatedCart) {
                throw new Error(`Error updating cart with id '${cid}'.`);
            }

            return response.status(200).json(updatedCart);
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    // Deletes a products list from cart by id
    static async deleteProductsToCartById(request, response) {
        try {
            const cid = request.params.id;

            if(!cid) {
                throw new Error("Cart Id parameter is required.");
            }

            if(await CartManager.deleteProductsToCartById(cid)) {
                return response.status(200).json({Message: "Cart deleted."});
            }
            else {
                return response.status(404).json({Message: `Cart with id '${id}' not founded.`});
            }
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    static async deleteProductFromCartById(request, response) {
        try {
            const cid = request.params.cid;
            const pid = request.params.pid;

            if(!cid) {
                throw new Error("Cart Id parameter is required.");
            }

            if(!pid) {
                throw new Error("Product Id parameter is required.");
            }

            if(await CartManager.deleteProductFromCartById(cid, pid)) {
                return response.status(200).json({Message: "Product deleted."});
            }
            else {
                return response.status(404).json({Message: `Product with id '${pid}' not founded in Cart.`});
            }
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }
}

module.exports = CartManagerController;