const fs = require('fs').promises;

class FileService {

    static async readFile(path) {
        try {
            const data = await fs.readFile(path, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    
    static async writeFile(path, data) {
        try {
            await fs.writeFile(path, JSON.stringify(data, null, 2), "utf8");
        }
        catch(error) {
            throw new Error(`Error writing on file to ${path}. Error: ${error}`);
        }
    }

    static async fileExists(path) {
        try {
            await fs.access(path, fs.constants.F_OK);
            return true;
        }
        catch (error) {
            return false;
        }
    }

}

module.exports = FileService;