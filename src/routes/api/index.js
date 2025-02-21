const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');

router.use("/carts", cartRouter);
router.use("/products", productRouter);

module.exports = router;