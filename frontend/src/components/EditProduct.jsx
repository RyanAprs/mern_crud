import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      getProductById();
    });
  
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        setName(response.data.name);
        setStock(response.data.stock);
        setPrice(response.data.price);
      } catch (error) {
        console.log(error);
      }
    };

    const updateUser = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(`http://localhost:5000/product/${id}`, {
                name,
                stock,
                price
            });
            navigate("/home")
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="columns mt-5">
            <div className="column is-half">
                <form onSubmit={updateUser}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input 
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Stock</label>
                        <div className="control">
                            <input 
                                type="text"
                                className="input"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Stock"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Price</label>
                        <div className="control">
                            <input 
                                type="text"
                                className="input"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Price</label>
                        <div className="control">
                            <button type="submit" className="button is-success">Update</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditProduct;