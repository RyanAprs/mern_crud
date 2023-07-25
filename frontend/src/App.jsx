import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Register from './pages/Register';
import Login from './pages/Login';

export const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<ProductList />} />
          <Route path="/dashboard/add" element={<AddProduct />} />
          <Route path="/dashboard/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}