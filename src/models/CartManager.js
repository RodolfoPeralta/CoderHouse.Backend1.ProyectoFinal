const FileService = require('../services/FileService');
const path = require('path');

class CartManager {

    // Properties
    static filePath = path.join(__dirname, "..", "..", "db", "carts.json");

    // Public Methods

    static async getCarts() {
        return await FileService.readFile(CartManager.filePath);
    }

    static async getCartById(cid) {
        const carts = await FileService.readFile(CartManager.filePath);
        return carts.find((c) => c.id === cid) || null;
    }

    static async createCart() {
        try {
            const carts = await FileService.readFile(CartManager.filePath);
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

        }

    }

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
        }
        catch (error) {

        }
    }
}

module.exports = CartManager;