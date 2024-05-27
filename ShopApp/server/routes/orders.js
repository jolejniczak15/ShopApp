const express = require('express');
const router = express.Router();
const Order = require('../models/orders_model');
const OrderProduct = require('../models/orders_products_model');
const Product = require('../models/products_model');
const jsonPatch = require('fast-json-patch');
const { StatusCodes } = require('http-status-codes');
const bookshelf = require('../models/bookshelf');
const moment = require('moment');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.fetchAll({ withRelated: 'status' });

        const formattedOrders = orders.map(order => {
            let formattedDate = '';
                const approvalDate = order.get('approval_date');
                if (approvalDate) {
                    const date = new Date(approvalDate);
                    formattedDate = date.toLocaleDateString('en-US');
                }  
            return {
                ...order.toJSON(),
                approval_date: formattedDate
            };
        });
        res.json(formattedOrders);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}),

    router.post('/', async (req, res) => {
        try {
            const { order_status_id, username, email, phone_number, products } = req.body;

            if (!username || !email || !phone_number) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'Username, email, and phone_number, date are required fields' });
                return;
            }

            if (!isValidPhoneNumber(phone_number)) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid phone_number format' });
                return;
            }


            const newOrder = await Order.forge({
                order_status_id,
                username,
                email,
                phone_number
            }).save();


            await bookshelf.transaction(async (trx) => {
                for (const productInfo of products) {
                    const { product_id, quantity } = productInfo;

                    const product = await Product.where({ product_id }).fetch({ transacting: trx });

                    if (!product) {
                        res.status(StatusCodes.BAD_REQUEST).json({ error: `Product with this id does not exist` });
                    }

                    if (quantity <= 0) {
                        es.status(StatusCodes.BAD_REQUEST).json({ error: `Quantity lower or equal to 0` });
                    }


                    await OrderProduct.forge({
                        order_id: newOrder.get('order_id'),
                        product_id,
                        quantity
                    }).save(null, { transacting: trx });
                }
            });


            res.json(newOrder);
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }


    }),


    router.patch('/:id', async (req, res) => {
        try {
            const orderId = req.params.id;
            const { patchOperations } = req.body;

            const existingOrder = await Order.where({ order_id: orderId }).fetch();

            if (!existingOrder) {
                res.status(StatusCodes.NOT_FOUND).json({ error: 'Order not found' });
                return;
            }

            const currentStatus = existingOrder.get('order_status_id');
            const newStatus = jsonPatch.applyPatch(existingOrder.toJSON(), patchOperations).newDocument.order_status_id;

            if (currentStatus === 3) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'Cannot change status of a canceled order' });
                return;
            }

            if (currentStatus === 4 && newStatus === 1) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'Cannot change status from 4 to 1' });
                return;
            }

            if (newStatus == 2) {
                existingOrder.set('approval_date', moment().format('YYYY-MM-DD'));
            }

            const patchedOrder = jsonPatch.applyPatch(existingOrder.toJSON(), patchOperations).newDocument;

            await existingOrder.save(patchedOrder);

            res.json(existingOrder);

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }),

    router.get('/status/:id', async (req, res) => {
        try {
            const statusId = req.params.id;

            const orders = await Order.where({ order_status_id: statusId }).fetchAll({ withRelated: 'status' });
            const formattedOrders = orders.map(order => {
                let formattedDate = '';
                const approvalDate = order.get('approval_date');
                if (approvalDate) {
                    const date = new Date(approvalDate);
                    formattedDate = date.toLocaleDateString('en-US');
                }  
                return {
                    ...order.toJSON(),
                    approval_date: formattedDate,
                };
            });

            res.json(formattedOrders);

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    })


function isValidPhoneNumber(phoneNumber) {
    return /^\d+$/.test(phoneNumber);
}

module.exports = router;