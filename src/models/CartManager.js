class CartManager {

    // Properties
    carts;
    cid;

    // Constructor

    constructor() {
        this.carts = [];
        this.cid = 1;
    }

    // Public Methods

    getCarts() {
        return this.carts || null;
    }

    getCartById(cid) {
        return this.carts.find((c) => c.id === cid) || null;
    }

    createCart() {
        const newCart = {
            id: this.cid++,
            products: []
        };

        this.carts.push(newCart);

        return newCart;
    }

    addProductToCart(cid, pid) {
        const cart = this.getCartById(cid);

        if(!cart) {
            throw new Error(`Cart with id ${cid} not founded.`);
        }

        const existingProduct = cart.products.find((p) => p.product === pid);

        if(existingProduct) {
            existingProduct.quantity += 1;

            return existingProduct;
        }
        else {

            const newProduct = {
                product: pid,
                quantity: 1
            }

            cart.products.push(newProduct);

            return newProduct;
        }
    }

}

module.exports = new CartManager();