import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainView from './views/MainView';
import CartView from './views/CartView';
import ManageView from './views/ManageView';
import EditProductView from './views/EditProductView'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
return (
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainView/>} />
          <Route path="/cart" element={<CartView/>}/>
          <Route path="/manage" element={<ManageView/>}/>
          <Route path="/edit" element={<EditProductView/>}/>
        </Routes>
  </BrowserRouter>
);
};

export default App