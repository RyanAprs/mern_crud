import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [ name, setName ] = useState("");
    const [ stock, setStock ] = useState("");
    const [ price, setPrice ] = useState("");
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
      
        if (!name || !stock || !price) {
          console.log('Data harus diisi lengkap');
          return;
        }
      
        try {
          await axios.post("http://localhost:5000/products", {
            name,
            stock,
            price
          });
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };
      

    return (
        <div className='columns mt-5'>
            <div className='column is-half'>
                <form onSubmit={saveProduct}>
                    <div className='field'>
                        <label>Name</label>
                        <div className='control'>
                            <input 
                                type='text'
                                className='input'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <label>Stock</label>
                        <div className='control'>
                            <input 
                                type='text'
                                className='input'
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Stock"
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <label>Price</label>
                        <div className='control'>
                            <input 
                                type='text'
                                className='input'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <button type="submit" className='button is-success'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;