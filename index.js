const app = require('./src/app');

// Port configuration
const PORT = 8080;

// Server init
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});