const path = require("path");
const Products = require("../models/Product");
const MongoDbService = require('../services/MongoDbService');

class ProductManager {

    // Public Methods

    // Adds a product to db
    static async addProduct(product) {
        try {
            return await MongoDbService.createOne(Products, product);
        }
        catch(error) {
            throw error;
        }
    }

    // Gets all products from db
    static async getProductsWithAggregate(options) {
        try {
            return await MongoDbService.aggregate(Products, options);
        }
        catch(error) {
            throw error;
        }
    }

    static async getProducts() {
        try {
            return await MongoDbService.getAll(Products);
        }
        catch(error) {
            throw error;
        }
    }

    // Gets one cart by id
    static async getProductById(id) {
        try {
            return await MongoDbService.getById(Products, id);
        }
        catch(error) {
            throw error;
        }
    }

    // Updates a product by id
    static async updateProduct(id, content) {
        try {
            return await MongoDbService.updateById(Products, content, id);
        }
        catch(error) {
            throw error;
        }
    }

    // Deletes a product by id
    static async deleteProduct(id) {
        try {
            return await MongoDbService.deleteById(Products, id);
        }
        catch(error) {
            throw error;
        }      
    }

    static async countProducts(query) {
        try {
            return await MongoDbService.countProducts(Products, query);
        }
        catch(error) {
            throw error;
        }
    }
}

module.exports = ProductManager;