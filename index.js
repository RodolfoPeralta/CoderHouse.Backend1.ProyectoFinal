const app = require('./src/app');
const mongoConnection = require('./src/config/mongo/mongo');
const socketConfiguration = require('./src/config/socket/socket');
require("dotenv").config();

// Port configuration
const PORT = 8080;

// MongoDB connection path
const mongoPath = process.env.MONGO_URI;

// Server init
const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Socket Configuration
socketConfiguration(server);

// MongoDB Connection
mongoConnection(mongoPath);


