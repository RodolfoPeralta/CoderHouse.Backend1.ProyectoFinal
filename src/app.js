const express = require('express');
const apiRouter = require('./routes/api');
const viewRouter = require('./routes/views/viewRouter');
const configureHandlebars = require('./config/handlebars/handlebars');
const configureMiddlewares = require('./config/Middlewares/middlewares');
const path = require('path');

const app = express();

// Middlewares
configureMiddlewares(app);

// Static files configuration
app.use("/static", express.static(path.join(__dirname, "./public")));

// Handlebars
configureHandlebars(app);

app.get("/", (request, response) => {
    response.render("index");
});

// Routes
app.use("/api", apiRouter);
app.use("/views", viewRouter);


module.exports = app;