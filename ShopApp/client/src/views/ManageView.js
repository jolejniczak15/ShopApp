import React from 'react';
import ProductManageTable from "../components/ProductManageTable";
import NavigationBar from '../components/NavigationBar';
import UnfilledOrders from '../components/UnfilledOrders';
import OrdersByStatus from '../components/OrdersByStatus';
const ManageView = () => {
    return (
        <div>
            <NavigationBar />
            <div className='container'>
                <ProductManageTable />
                <UnfilledOrders/>
                <OrdersByStatus/>
            </div>
        </div>

    );
};

export default ManageView;