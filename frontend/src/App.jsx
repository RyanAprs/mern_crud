import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';

export const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path="/home" element={<ProductList />} />
          <Route path="/home/add" element={<AddProduct />} />
          <Route path="/home/edit/:id" element={<EditProduct />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/nav" element={<Navbar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}