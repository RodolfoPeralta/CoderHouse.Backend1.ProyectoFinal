const ProductManager = require('../models/ProductManager');

class ProductManagerController {

    static getProducts(request, response) {
        const products = ProductManager.getProducts();
        return response.status(200).json(products);
    }

    static getProductById(request, response) {
        const {id} = request.params;
        const product = ProductManager.getProductById(parseInt(id));

        if(!product) {
            return response.status(404).json({message: `product with id ${id} not founded.`});
        }

        return response.status(200).json(product);
    }

    static addProduct(request, response) {
        const {title, description, code, price, status, stock, category, thumbnails} = request.body;

        const product = {
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnails: thumbnails
        }

        ProductManager.addProduct(product);

        return response.status(201).json(product);
    }
}

module.exports = ProductManagerController;