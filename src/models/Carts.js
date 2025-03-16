const mongoose = require('mongoose');

const cartsCollection = "Cart";

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {type: Number, default: 1 }
        }
    ]
});

const Carts = mongoose.model(cartsCollection, cartsSchema);

module.exports = Carts;