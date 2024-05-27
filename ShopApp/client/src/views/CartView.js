import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CartTable from '../components/CartTable';
import OrderDetailsForm from '../components/OrderDetailsForm';
import NavigationBar from '../components/NavigationBar';

const CartView = () => {


    const location = useLocation();
    const [uniqueProductsInCart, setUniqueProductsInCart] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);


    useEffect(() => {
        const calculateQuantity = (cart) => {
            const productsMap = new Map();
            cart.forEach(product => {
                if (productsMap.has(product.product_id)) {
                    productsMap.set(product.product_id, productsMap.get(product.product_id) + 1);
                } else {
                    productsMap.set(product.product_id, 1);
                }
            });
            console.log(productsMap);


            const uniqueProducts = [];
            const orderedProductsData = [];
            productsMap.forEach((quantity, productId) => {
                const product = cart.find(product => product.product_id === productId);
                if (product) {
                    uniqueProducts.push({
                        ...product,
                        quantity: quantity
                    });
                    orderedProductsData.push({
                        product_id: productId,
                        quantity: quantity
                    })
                }
            });
            console.log(uniqueProducts);
            console.log(orderedProductsData);
            setSelectedProducts(orderedProductsData);
            return uniqueProducts;
        };

        const initialUniqueProductsInCart = calculateQuantity(location.state.cart);
        setUniqueProductsInCart(initialUniqueProductsInCart);
    }, [location.state.cart]);


    const handleQuantityChange = (productId, newQuantity) => {
        setUniqueProductsInCart(prevProducts => {
            return prevProducts.map(product => {
                if (product.product_id === productId) {
                    return {
                        ...product,
                        quantity: newQuantity
                    };
                }
                return product;
            });
        });


        setSelectedProducts(prevSelectedProducts => {
            return prevSelectedProducts.map(selectedProduct => {
                if (selectedProduct.product_id === productId) {
                    return {
                        ...selectedProduct,
                        quantity: newQuantity
                    };
                }
                return selectedProduct;
            });
        });
    };

    const handleDeleteProduct = (productId) => {
        setUniqueProductsInCart(prevProducts => {
            return prevProducts.filter(product => product.product_id !== productId);
        });
        setSelectedProducts(prevProducts => {
            return prevProducts.filter(product => product.product_id !== productId);
        });
    };





    return (
        <div>
            <NavigationBar />
            <div className='container'>
                <h2 className='mt-5'>Cart</h2>
                <CartTable
                    products={uniqueProductsInCart}
                    onQuantityChange={handleQuantityChange}
                    onDeleteProduct={handleDeleteProduct} />
                <OrderDetailsForm selectedProducts={selectedProducts} />
            </div>
        </div>
    );
};


export default CartView;