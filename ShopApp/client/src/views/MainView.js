import React from 'react';
import ProductTable from '../components/ProductTable';
import NavigationBar from '../components/NavigationBar';

const MainView = () => {
    return (
        <div>
            <NavigationBar/>
            <div  className="container">
            <ProductTable />
            </div>
        </div>
       
    );
};

export default MainView;