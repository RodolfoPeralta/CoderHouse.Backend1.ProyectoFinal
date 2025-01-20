const ProductManager = require('../models/ProductManager');

class ProductManagerController {

    static getProducts(request, response) {
        const products = ProductManager.getProducts();

        if(!products) {
            return response.status(404);
        }

        return response.status(200).json(products);
    }

    static getProductById(request, response) {
        const id = Number(request.params.id);
        const product = ProductManager.getProductById(id);

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
        };

        ProductManager.addProduct(product);

        return response.status(201).json(product);
    }

    static updateProduct(request, response) {
        const id = Number(request.params.id);
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
        };

        if(ProductManager.updateproduct(id, product)) {
            return response.status(200).json({message: `Product with id ${id} updated.`});
        }
        else {
            return response.status(404).json({message: `Product with id ${id} not founded.`});
        }
    }

    static deleteProduct(request, response) {
        const id = Number(request.params.id);
        if(ProductManager.deleteProduct(id)) {
            response.status(200).json({message: "Product deleted."});
        }
        else {
            response.status(404).json({message: `product with id ${id} not founded.`});
        }
    }
}

module.exports = ProductManagerController;