const express = require('express');
const router = express.Router();
const OrderProduct = require('../models/orders_products_model');
const { StatusCodes } = require('http-status-codes');

router.get('/:orderId/products', async (req, res) => {
    try {
        const orderId = req.params.orderId;

       const orderProducts = await OrderProduct.where({ order_id: orderId }).fetchAll({ withRelated: 'product' });

        const products = orderProducts.map(orderProduct => ({
            orders_products_id: orderProduct.get('orders_products_id'),
            product_id: orderProduct.get('product_id'),
            name: orderProduct.related('product').get('name'),
            price: orderProduct.related('product').get('unit_price'),
            quantity: orderProduct.get('quantity')
        }));


        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;