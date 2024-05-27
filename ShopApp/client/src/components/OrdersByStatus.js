import React, { useState, useEffect } from "react";
import axios from 'axios';


const OrdersByStatus = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [statuses, setStatuses] = useState([]);


    const fetchOrders = async () => {
        try {
            const ordersResponse = await axios.get('http://localhost:5000/orders');
            setOrders(ordersResponse.data);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/status');
                setStatuses(response.data);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchStatuses();
        fetchOrders();
    }, []);



    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const filteredOrders = orders.filter(order => {
        if (selectedStatus && order.status.name !== selectedStatus) {

            return false;
        }

        return true;
    });


    return (
        <div className='container mb-5'>
            <h2 className="mt-5">Orders</h2>
            <div className="mb-3">
                <select className="form-control mb-3" value={selectedStatus} onChange={handleStatusChange}>
                    <option value="">All orders</option>
                    {Array.from(new Set(orders.map(order => order.status.name))).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            <table className="table table-striped table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">Order id</th>
                        <th scope="col">Order status</th>
                        <th scope="col">Approval date</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone number</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.status.name}</td>
                            <td>{order.approval_date}</td>
                            <td>{order.username}</td>
                            <td>{order.email}</td>
                            <td>{order.phone_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersByStatus;