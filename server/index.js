require('dotenv').config();
const express = require('express');
const app = express();
const port = 3500;
const controllers = require('../controllers/index.js');


app.use(express.json());

app.get('/products', controllers.allProducts.getAll);
app.get('/products/:product_id', controllers.allProducts.getOne);
app.get('/products/:product_id/styles', controllers.allProducts.getStyles);
app.get('/products/:product_id/related', controllers.allProducts.getRelated);


app.listen(port);
console.log(`Listening at ${port}`);