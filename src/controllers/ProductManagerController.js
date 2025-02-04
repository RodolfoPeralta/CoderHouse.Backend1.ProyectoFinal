const ProductManager = require('../models/ProductManager');

class ProductManagerController {

    static async getProducts(request, response) {
        const products = await ProductManager.getProducts();

        if(!products) {
            return response.status(404);
        }

        return response.status(200).json(products);
    }

    static async getProductById(request, response) {
        const id = Number(request.params.id);
        const product = await ProductManager.getProductById(id);

        if(!product) {
            return response.status(404).json({message: `product with id ${id} not founded.`});
        }

        return response.status(200).json(product);
    }

    static async addProduct(request, response) {
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

        const newProduct = await ProductManager.addProduct(product);

        return response.status(201).json(newProduct);
    }

    static async updateProduct(request, response) {
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

        if(await ProductManager.updateproduct(id, product)) {
            return response.status(200).json({message: `Product with id ${id} updated.`});
        }
        else {
            return response.status(404).json({message: `Product with id ${id} not founded.`});
        }
    }

    static async deleteProduct(request, response) {
        const id = Number(request.params.id);
        if(await ProductManager.deleteProduct(id)) {
            response.status(200).json({message: "Product deleted."});
        }
        else {
            response.status(404).json({message: `product with id ${id} not founded.`});
        }
    }
}

module.exports = ProductManagerController;