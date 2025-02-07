const express = require('express');
const cartRouter = require('./routes/cartRouter');
const productRouter = require('./routes/productRouter');
const multer = require('multer');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Multer
const storageConfig = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, path.resolve(__dirname, './uploads'));
    },
    filename: (request, file, cb) => {
        const timestamp = Date.now();
        const originalname = file.originalname;
        const ext = path.extname(originalname);
        cb(null, `${timestamp}-${originalname}`);
    }
});

const upload = multer({storage: storageConfig});

app.post('/upload', upload.single('file'), (request, reponse) => {});

// Routes

// Products
app.use('/api/products', productRouter);

// Carts
app.use('/api/carts', cartRouter);

module.exports = app;