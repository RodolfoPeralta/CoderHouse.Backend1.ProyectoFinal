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
        return this.products;

        // TODO: traer productos desde el archivo local
    }

    getProductById(id) {

        const wanted = this.products.some((p) => p.id === id);

        if(wanted) {
            return this.products.find((p) => p.id === id);
        }

        // TODO: traer producto desde el archivo local
    }
}

module.exports = new ProductManager();