import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get("http://localhost:5000/products");
        setProduct(response.data);
    };

    const deleteProduct = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/product/${id}`);
          getProducts();
        } catch (error) {
          console.log(error);
        }
      };
      

    return (
        <div className="columns mt-5">
            <div className="column is-half">
                <Link to="add" className="button is-succes">Add New Product</Link>
                <table className="table is-striped is-fullwidth mt-2">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product, number) => (
                            <tr key={product.id}>
                                <td>{number + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Link to={`edit/${product.id}`}
                                    className="button is-info is-small mr-1"
                                    >
                                        Edit
                                    </Link>
                                    <button onClick={() => deleteProduct(product.id)}
                                    className="button is-danger is-small"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList;