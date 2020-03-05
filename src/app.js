const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//conecta ao banco de dados
mongoose.connect('mongodb+srv://wesley:23111988@mondodb-cluster-hod3u.mongodb.net/nodestr', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//carrega os models
const Product = require('./models/product');

//carrega as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;