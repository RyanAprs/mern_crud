import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [product, setProduct] = useState([]);
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        axios.get("/")
        .then(res => {
          if(res.data.Status === "Success") {
            setAuth(true);
            setUsername(res.data.username)
          } else {
            setAuth(false);
            setMessage(res.data.Error)
          }
        })
        .then(err => console.log(err))
    })

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

      const handleLogout = () => {}
      

    return (
    <div>
        {
            auth ? 
            <div>
                <nav class="navbar navbar-light bg-light justify-content-between">
                    <a href="/home" className="navbar-brand">{username}</a>
                    <form class="form-inline">
                        <button onClick={handleLogout} class="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
                    </form>
                </nav>

                    <div className="columns mt-3">
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
            </div>
            :
            <div>
                <h1 className="text-center color-black">404 Not Found</h1>
                <h3>{message}</h3>
            </div>
        }  
    </div>

    )
    
}

export default HomePage;



