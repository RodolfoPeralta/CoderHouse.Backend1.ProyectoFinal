const express = require('express');
const routes = require('./routes/api');
const viewRouter = require('./routes/views/viewRouter');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Static files configuration
app.use("/static", express.static(path.join(__dirname, "./public")));

// Handlebars
const viewsPath = path.join(__dirname, "./","views");
app.engine('handlebars', handlebars.engine());
app.set('views', viewsPath);
app.set('view engine', 'handlebars');

app.get("/", (request, response) => {
    response.render("index");
});

// Routes
app.use("/api", routes);
app.use("/views", viewRouter);


module.exports = app;