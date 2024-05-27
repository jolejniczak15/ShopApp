const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const Product = require('../models/products_model');
const { StatusCodes } = require('http-status-codes');


router.get('/', async (req, res) => {
    try {
        const products = await Product.fetchAll({ withRelated: 'category'});
        const productsWithCategories = products.map(product => {
            return{
                ...product.toJSON(),
                category_name: product.related('category').get('name')
            };
            
        });
        res.json(productsWithCategories);
    } catch (error) {
        console.error(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}),

    router.get('/:id', async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await new Product({ product_id: productId }).fetch();

            if (!product) {
                res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
                return;
            }

            res.json(product)
        } catch (error) {
            console.error(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }),


    router.post('/', async (req, res) => {

        const { name, description, unit_price, unit_weight, category_id } = req.body;

        if (!name || !description || !unit_price || !unit_weight || !category_id) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Name, unit_price, unit_weight, and category_id are required' });
            return;
        }

        if (unit_price <= 0 || unit_weight <= 0) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Unit price and unit weight must be positive values' });
            return;
        }

        try {
            const newProduct = await Product.forge({
                name,
                description,
                unit_price,
                unit_weight,
                category_id
            }).save();

            res.json(newProduct);

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }),


    router.put('/:id', async (req, res) => {
        try {

            const productId = req.params.id;
            
            const existingProduct = await Product.where({ 'product_id': productId }).fetch();

            if (!existingProduct) {
                res.status(StatusCodes.NOT_FOUND).json({ error: 'Product not found' });
            }

            const { name, description, unit_price, unit_weight, category_id } = req.body;

            if (unit_price < 0 || unit_weight < 0 || unit_price === 0 || unit_weight === 0) {
                res.status(StatusCodes.BAD_REQUEST).json({ error: 'Unit price and unit weight must be positive values' });
                return;
            }

            const updatedProduct = await existingProduct.save({
                name,
                description,
                unit_price,
                unit_weight,
                category_id
            });

            res.json(updatedProduct);

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }


    })








module.exports = router;