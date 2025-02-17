const express = require('express');
const routes = require('./routes/index');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Handlebars
const viewsPath = path.join(__dirname, "./","views");

app.engine('handlebars', handlebars.engine());
app.set('views', viewsPath);
app.set('view engine', 'handlebars');
app.use(express.static(viewsPath));

app.get("/", (request, response) => {
    response.render("index");
});

// Routes
app.use('/api', routes);

module.exports = app;