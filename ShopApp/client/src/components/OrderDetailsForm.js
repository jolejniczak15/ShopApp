import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const OrderDetailsForm = ({ selectedProducts }) => {
    const [formData, setFormData] = useState({
        order_status_id: 1,
        username: '',
        email: '',
        phone_number: '',
        products: []
    });

    const navigate = useNavigate();

    useEffect(() => {
        setFormData(formData => ({
            ...formData,
            products: selectedProducts
        }));
    }, [selectedProducts]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/orders', formData);
            console.log(response.data);
            console.log(selectedProducts);
            setFormData({
                order_status_id: 1,
                username: '',
                email: '',
                phone_number: '',
                products: selectedProducts
            });
            console.log(formData);
            navigate('/');
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.error);
            } else {
                console.error('Internal Server Error');
            }
        }
    };


    return (
        <div className="container">
            <h2 className="mt-5">Order Details</h2>
            <form className="container">
                <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone number:</label>
                    <input type="text" className="form-control" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit Order</button>
            </form>
        </div>
    );
}



export default OrderDetailsForm;