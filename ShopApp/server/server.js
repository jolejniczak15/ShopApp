const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.listen(5000, () => console.log("Server started on port 5000"));

app.use(express.json());
const categoriesRoute = require('./routes/categories');
app.use('/categories', categoriesRoute);
const productsRoute = require('./routes/products');
app.use('/products', productsRoute);
const ordersRoute = require('./routes/orders');
app.use('/orders',ordersRoute);
const statusRoute = require('./routes/order_statuses');
app.use('/status',statusRoute);
const ordersProductsRoute = require('./routes/orders_products');
app.use('/ordersproducts',ordersProductsRoute);