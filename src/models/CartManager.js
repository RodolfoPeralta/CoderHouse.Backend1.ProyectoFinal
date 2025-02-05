const FileService = require('../services/FileService');
const path = require('path');

class CartManager {

    // Properties

    static filePath = path.join(__dirname, "..", "..", "db", "carts.json");

    // Public Methods

    // Gets all carts from carts.json file
    static async getCarts() {
        try {
            return await FileService.readFile(CartManager.filePath);
        }
        catch(error) {
            throw error;
        }
    }

    // Gets one cart by id
    static async getCartById(cid) {
        try {
            const carts = await FileService.readFile(CartManager.filePath);
            return carts.find((c) => c.id === cid) || null;
        }
        catch(error) {
            throw error;
        }
    }

    // Creates a new cart
    static async createCart() {
        try {
            const carts = await FileService.readFile(CartManager.filePath);

            // Retrieves the last id to create new cart with the next value
            const cid = carts.length > 0 ? (Math.max(...carts.map((c) => c.id)) + 1) : 1;

            const newCart = {
                id: cid,
                products: []
            };

            carts.push(newCart);
            await FileService.writeFile(CartManager.filePath, carts);

            return newCart;
        }
        catch (error) {
            throw error;
        }
    }

    // Adds a product with id = pid to the cart with id = cid
    static async addProductToCart(cid, pid) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find((cart) => cart.id === cid);

            if (!cart) {
                return null;
            }

            const existingProduct = cart.products.find((p) => p.product === pid);

            if (existingProduct) {
                existingProduct.quantity += 1;
            }
            else {
                const newProduct = {
                    product: pid,
                    quantity: 1
                };

                cart.products.push(newProduct);
            }

            await FileService.writeFile(CartManager.filePath, carts);

            return cart;
        }
        catch (error) {
            throw error;
        }
    }

    // Deletes a cart by id
    static async deleteCartById(id) {
        try {
            const carts = await FileService.readFile(CartManager.filePath);
            console.log("Carts: ", carts);

            if(carts.some((c) => c.id === id)) {
                const newCarts = carts.filter((c) => c.id !== id);
                console.log("New Carts: ", newCarts);
                await FileService.writeFile(CartManager.filePath, newCarts);

                return true;
            }
            else {
                return false;
            }
        }
        catch(error) {
            throw error;
        }
    }
}

module.exports = CartManager;