const path = require("path");
const FileService = require("../services/FileService");

class ProductManager {

    // Properties

    static filePath = path.join(__dirname, "..", "..", "db", "products.json");

    // Public Methods

    static async addProduct(product) {
        try {
            const products = await FileService.readFile(ProductManager.filePath);
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

        }
    }

    static async getProducts() {
        return await FileService.readFile(ProductManager.filePath);
    }

    static async getProductById(id) {
        const products = await FileService.readFile(ProductManager.filePath);

        return products.find((p) => p.id === id) || null;
    }

    static async updateproduct(id, content) {
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

    static async deleteProduct(id) {
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
}

module.exports = ProductManager;