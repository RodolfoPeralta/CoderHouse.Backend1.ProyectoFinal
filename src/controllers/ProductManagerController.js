const ProductManager = require('../managers/ProductManager');

class ProductManagerController {

    // Public Methods

    // Gets products from db
    static async getProducts(request, response) {
        try {
            let { limit = 10, page = 1, query = '{}', sort} = request.query;
            
            limit = parseInt(limit);
            page = parseInt(page);

            try {
                query = JSON.parse(query);
            }
            catch(error) {
                throw new Error("Error getting an object from query param.");
            }
            
            const sortOption = sort ? { price: sort === 'asc' ? 1 : -1 } : null;

            // Gets total products for a particular query
            const totalProducts = await ProductManager.countProducts(query);

            // Gets total pages
            const totalPages = Math.ceil(totalProducts / limit);

            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            const prevPage = hasPrevPage ? page - 1 : null;
            const nextPage = hasNextPage ? page + 1 : null;
            
            const prevLink = hasPrevPage ? `/api/products?page=${prevPage}&limit=${limit}` : null;
            const nextLink = hasNextPage ? `/api/products?page=${nextPage}&limit=${limit}` : null;

            const options = {
                limit,
                page,
                query,
                sort: sortOption
            }
            
            const products = await ProductManager.getProductsWithAggregate(options);

            const totalResponse = {
                status: "success",
                payload: products,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink,
                nextLink
            }

            return response.status(200).json(totalResponse);
        }
        catch(error) {
            return response.status(500).json({status: "error", Message: `${error}`});
        }
    }

    // Gets a product by id
    static async getProductById(request, response) {
        try {
            const id = request.params.id;

            if(!id) {
                throw new Error(`Id parameter is required.`);
            }

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

    // Adds an specific product to db
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

    // Updates a product by id
    static async updateProduct(request, response) {
        try {
            const id = request.params.id;

            if(!id) {
                throw new Error(`Id parameter is required.`);
            }

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
            
            if(await ProductManager.updateProduct(id, product)) {
                return response.status(200).json({Message: `Product with id '${id}' updated.`});
            }
            else {
                return response.status(404).json({Message: `Product with id '${id}' not founded.`});
            }
        }
        catch(error) {
            return response.status(500).json({Message: `${error}`});
        }
    }

    // Deletes a product by id
    static async deleteProduct(request, response) {
        try {
            const id = request.params.id;

            if(!id) {
                throw new Error(`Id parameter is required.`);
            }

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