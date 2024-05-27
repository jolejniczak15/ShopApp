import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';


const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchName, setSearchName] = useState('');
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

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
        console.log(cart);
    };

    const handleCheckout = () => {
        navigate('/cart', { state: { cart } });
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value);
    };

    const filteredProducts = products.filter(product => {

        if (selectedCategory && product.category_name !== selectedCategory) {
            return false;
        }

        if (searchName && !product.name.toLowerCase().includes(searchName.toLowerCase())) {
            return false;
        }
        return true;

    });

    return (

        <div className="container">
            <h2 className="mt-5">Product list</h2>
            <div className="mb-3">
            <select className="form-control mb-3" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All categories</option>
                {Array.from(new Set(products.map(product => product.category_name))).map(category => (
                      <option key={category} value={category}>{category}</option>
                ))}
            </select>
            </div>
            <div className="mb-3">
                <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={handleSearchNameChange}
                />
            </div>
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
                    {filteredProducts.map((product) => (
                        <tr key={product.product_id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.unit_price}</td>
                            <td>{product.unit_weight}</td>
                            <td>{product.category_name}</td>
                            <td><button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Buy</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-success" onClick={handleCheckout}>Go to checkout</button>
        </div>
    );
}

export default ProductTable;
