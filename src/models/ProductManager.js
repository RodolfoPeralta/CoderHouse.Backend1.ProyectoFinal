class ProductManager {

    // Properties

    path;
    products;
    id;

    // Constructor

    constructor() {
        this.products = [];
        this.id = 1;
    }

    // Public Methods

    addProduct(product) {
        const newProduct = {
            id: this.id++,
            ...product
        }

        this.products.push(newProduct);

        // TODO: Guardar arreglo de productos en archivo local
    }

    getProducts() {
        return this.products || null;

        // TODO: traer productos desde el archivo local
    }

    getProductById(id) {
        return this.products.find((p) => p.id === id) || null;

        // TODO: traer producto desde el archivo local
    }

    updateproduct(id, content) {
        if(this.products.some((p) => p.id === id)) {
            
            const index = this.products.findIndex((p) => p.id === id);

            if(index === -1) {
                return false;
            }

            this.products[index] = {...this.products[index], ...content};

            return true;
        }
        else {
            return false;
        }
    }

    deleteProduct(id) {
        if(this.products.some((p) => p.id === id)) {
            const newProducts = this.products.filter((p) => p.id !== id);
            this.products = newProducts;
            return true;
        }
        else {
            return false;
        } 
    }
}

module.exports = new ProductManager();