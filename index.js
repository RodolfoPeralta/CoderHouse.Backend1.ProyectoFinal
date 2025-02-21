const app = require('./src/app');
const { Server } = require('socket.io');
const configSocket = require('./src/config/socket');

// Port configuration
const PORT = 8080;

// Server init
const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Websocket on server side
const io = new Server(server);

// Socket Configuration
configSocket(io);


