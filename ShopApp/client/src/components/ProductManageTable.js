import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';


const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

   const handleEditProduct = (product) => {
    navigate('/edit', { state: { product } });

   };


 


    return (

        <div className="container">
            <h2 className="mt-5">Product list</h2>
            <table className="table table-striped table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.product_id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.unit_price}</td>
                            <td>{product.unit_weight}</td>
                            <td>{product.category_name}</td>
                            <td><button className="btn btn-danger" onClick={() => handleEditProduct(product)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    );
}

export default ProductTable;
