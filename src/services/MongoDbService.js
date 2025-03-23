class MongoDbService {
    
    // Public Methods

    static async getAll(model) {
        try {
            const items = await model.find().lean();

            if(items.length === 0) {
                throw new Error("No items found");
            }

            return items;
        }
        catch(error) {
            throw(error);
        }
    }

    static async getById(model, id) {
        try {

            const item = await model.findById(id).lean();

            if(!item) {
                throw(`Error getting an item with id '${id}' from MongoDb Database`);
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
                throw new Error("Error creating a new item in the database");
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
                throw(`Item with Id '${id}' not founded`);
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
                throw(`Item with Id '${id}' not founded`);
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

    static async getWithPaginate(model, query, options) {
        try {
            return await model.paginate(query, {...options, lean: true });
        }
        catch(error) {
            throw error;
        }
    }
}

module.exports = MongoDbService;