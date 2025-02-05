const path = require("path");
const FileService = require("../services/FileService");

class ProductManager {

    // Properties

    static filePath = path.join(__dirname, "..", "..", "db", "products.json");

    // Public Methods

    // Adds a product to products.json file
    static async addProduct(product) {
        try {
            const products = await FileService.readFile(ProductManager.filePath);

            // Retrieves the last id to create new product with the next value
            const pid = products.length > 0 ? (Math.max(...products.map((p) => p.id)) + 1) : 1;

            const newProduct = {
                id: pid,
                ...product
            };

            products.push(newProduct);

            await FileService.writeFile(ProductManager.filePath, products);

            return newProduct;
        }
        catch(error) {
            throw error;
        }
    }

    // Gets all products from products.json file
    static async getProducts() {
        try {
            return await FileService.readFile(ProductManager.filePath);
        }
        catch(error) {
            throw error;
        }
    }

    // Gets one cart by id
    static async getProductById(id) {
        try {
            const products = await FileService.readFile(ProductManager.filePath);
            return products.find((p) => p.id === id) || null;
        }
        catch(error) {
            throw error;
        }
    }

    // Updates a product by id
    static async updateproduct(id, content) {
        try {
            const products = await FileService.readFile(ProductManager.filePath);
        
            if(products.some((p) => p.id === id)) {
            
                const index = products.findIndex((p) => p.id === id);

                if(index === -1) {
                    return false;
                }

                products[index] = {...products[index], ...content};

                await FileService.writeFile(ProductManager.filePath, products);

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

    // Deletes a product by id
    static async deleteProduct(id) {
        try {
            const products = await FileService.readFile(ProductManager.filePath);

            if(products.some((p) => p.id === id)) {
                const newProducts = products.filter((p) => p.id !== id);

                await FileService.writeFile(ProductManager.filePath, newProducts);

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

module.exports = ProductManager;