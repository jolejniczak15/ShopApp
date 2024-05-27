const express = require('express');
const router = express.Router();
const Category = require('../models/categories_model');
const {StatusCodes} = require('http-status-codes');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.fetchAll();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;