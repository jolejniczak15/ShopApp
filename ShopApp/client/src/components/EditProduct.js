import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const EditProduct = ({ selectedProduct }) => {

    const [product, setProduct] = useState({
        name: selectedProduct.name,
        description: selectedProduct.description,
        unit_price: selectedProduct.unit_price,
        unit_weight: selectedProduct.unit_weight,
        category_id: selectedProduct.category_id
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/categories');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(product);
            const res = await axios.put(`http://localhost:5000/products/${selectedProduct.product_id}`, product)
            console.log(res.data);
            navigate("/manage");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container'>
            <h2 className="mt-5">Edit the product</h2>
            <form className='container' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <input type="text" className="form-control" name="description" value={product.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price:</label>
                    <input type="number" className="form-control" name="unit_price" value={product.unit_price} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Weight:</label>
                    <input type="number" className="form-control" name="unit_weight" value={product.unit_weight} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category:</label>
                    <select className="form-control" name="category_id" value={product.category_id} onChange={handleChange}>
                        <option value="">Select category</option>
                        {categories.map(category => (
                            <option key={category.category_id} value={category.category_id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default EditProduct;