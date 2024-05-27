import React from 'react';
import { useLocation } from 'react-router-dom';
import EditProduct from '../components/EditProduct';

const EditProductView = () => {
    const location = useLocation();
    const product = location.state.product;



    return (
        <div className='container'>
            <EditProduct selectedProduct={product}/>
        </div>

    );
};

export default EditProductView;