const ProductManager = require('../models/ProductManager');

class ProductManagerController {

    static async getProducts(request, response) {
        try {
            const products = await ProductManager.getProducts();
            return response.status(200).json(products);
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    static async getProductById(request, response) {
        try {
            const id = Number(request.params.id);
            const product = await ProductManager.getProductById(id);
    
            if(!product) {
                return response.status(404).json({Message: `product with id ${id} not founded.`});
            }
    
            return response.status(200).json(product);
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    static async addProduct(request, response) {
        try {
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
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        } 
    }

    static async updateProduct(request, response) {
        try {
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
                return response.status(200).json({Message: `Product with id ${id} updated.`});
            }
            else {
                return response.status(404).json({Message: `Product with id ${id} not founded.`});
            }
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    static async deleteProduct(request, response) {
        try {
            const id = Number(request.params.id);
            if(await ProductManager.deleteProduct(id)) {
                response.status(200).json({Message: "Product deleted."});
            }
            else {
                response.status(404).json({Message: `product with id ${id} not founded.`});
            }
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }
}

module.exports = ProductManagerController;