const express = require('express');
const router = express.Router();
const OrderState = require('../models/order_statuses_model');
const {StatusCodes} = require('http-status-codes');

router.get('/', async (req, res) => {
    try {
        const statuses = await OrderState.fetchAll();
        res.json(statuses);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;