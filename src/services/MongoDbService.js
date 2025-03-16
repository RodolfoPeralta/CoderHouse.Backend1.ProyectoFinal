class MongoDbService {
    
    // Public Methods

    static async getAll(model, isPopulate) {
        try {
            let query = model.find().lean();

            if(isPopulate) {
                query = query.populate("products.product", "_id title description price status stock category");
            }

            const items = await query;

            if(items.length === 0) {
                throw new Error("No items found.");
            }

            return items;
        }
        catch(error) {
            throw(error);
        }
    }

    static async getById(model, id, isPopulate) {
        try {

            let query = model.findById(id).lean();

            if(isPopulate) {
                query = query.populate("products.product", "_id title description price status stock category");
            }

            const item = await query;

            if(!item) {
                throw(`Error getting an item with id '${id}' from MongoDb Database.`);
            }

            return item;
        }
        catch(error) {
            throw(error);
        }
    }

    static async createOne(model, item = []) {
        try {
            const newItem = new model({
                ...item
            });

            const savedItem = newItem.save();

            if(!savedItem) {
                throw new Error();
            }

            return savedItem;
        }
        catch(error) {
            throw(error);
        }
    }

    static async updateById(model, item, id) {
        try {
            const updatedItem = model.findByIdAndUpdate(id, item);

            if(!updatedItem) {
                throw(`Item with Id '${id}' not founded.`);
            }

            return updatedItem;
        }
        catch(error) {
            throw(error);
        }
    }

    static async deleteById(model, id) {
        try {
            const item = model.findByIdAndDelete(id);

            if(!item) {
                throw(`Item with Id '${id}' not founded.`);
            }

            return item;
        }
        catch(error) {
            throw(error);
        }
    }

    static async aggregate(model, options) {
        try {

            const pipeline = [];

            if(options.query) {
                pipeline.push({$match: options.query});
            }

            if(options.sort) {
                pipeline.push({$sort: options.sort});
            }

            if(options.page && options.limit) {
                const skip = (options.page - 1) * options.limit;
                pipeline.push({$skip: skip});
            }

            if(options.limit) {
                pipeline.push({$limit: options.limit});
            }

            return await model.aggregate(pipeline);
        }
        catch(error) {
            throw(error);
        }
    }

    static async countProducts(model, query) {
        try {
            return await model.countDocuments(query);
        }
        catch(error) {
            throw error;
        }
    } 
}

module.exports = MongoDbService;