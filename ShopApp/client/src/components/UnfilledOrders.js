import React, { useState, useEffect } from "react";
import axios from 'axios';


const UnfilledOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);


    const fetchOrders = async () => {
        try {
            const ordersResponse = await axios.get('http://localhost:5000/orders/status/1');
            const ordersData = ordersResponse.data;

            const ordersResponse2 = await axios.get('http://localhost:5000/orders/status/2');
            const ordersData2 = ordersResponse2.data;


            const allOrdersData = ordersData.concat(ordersData2);


            for (const order of allOrdersData) {
                const productsResponse = await axios.get(`http://localhost:5000/ordersproducts/${order.order_id}/products`);
                const productsData = productsResponse.data;
                order.products = productsData;
            }

            setOrders(allOrdersData);
        }
        catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatusId) => {
        try {
            await axios.patch(`http://localhost:5000/orders/${orderId}`, {
                patchOperations: [
                    { "op": "replace", "path": "/order_status_id", "value": newStatusId }
                ]
            });

            fetchOrders();


        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectStatus = (e) => {
        setSelectedStatus(e.target.value);
    };



    return (
        <div className='container'>
            <h2 className="mt-5">Unfulfilled orders</h2>
            <table className="table table-striped table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">Order id</th>
                        <th scope="col">Order status</th>
                        <th scope="col">Approval date</th>
                        <th scope="col">Username</th>
                        <th scope="col">Product name</th>
                        <th scope="col">Product price</th>
                        <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        order.products.map(product => (
                            <tr key={product.orders_products_id}>
                                <td>{order.order_id}</td>
                                <td>{order.status.name}</td>
                                <td>{order.approval_date}</td>
                                <td>{order.username}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
            <h2>Change status</h2>
            <table className="table table-striped table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">Order id</th>
                        <th scope="col">Order status</th>
                        <th scope="col">Change status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.status.name}</td>
                            <td>
                                <select onChange={handleSelectStatus}>
                                    <option value="">Select status</option>
                                    <option value="2">APPROVED</option>
                                    <option value="3">CANCELLED</option>
                                    <option value="4">COMPLETED</option>
                                </select>
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => handleStatusChange(order.order_id, selectedStatus)}>Confirm</button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>

        </div>
    );
};

export default UnfilledOrders;