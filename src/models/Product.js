const mongoose = require('mongoose');

const productsCollection = "Product";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: false },
    stock: { type: Number, required: true },
    category: { type: String, enum: ["Electric Guitar", "Acoustic Guitar", "Classic Guitar"], required: true },
    thumbnails: { type: String, required: false }
});

const Products = mongoose.model(productsCollection, productSchema); 

module.exports = Products;