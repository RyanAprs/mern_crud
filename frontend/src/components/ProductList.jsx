import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const HomePage = () => {
    const [username, setUsername] = useState('');
    const [token ,  setToken] = useState('');
    const [expire ,  setExpire] = useState('');

    const navigate = useNavigate();

    const [product, setProduct] = useState([]);

    useEffect(() => {
        refreshToken();
    })

    const refreshToken = async() => {
        try {
            const response = await axios.get("http://localhost:5000/token");
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUsername(decoded.name)
            setExpire(decoded.exp);
        } catch (error) {
            if(error.response) {
                console.log(error.response)
                navigate("/");
            }
        }
    }

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

      const Logout = async () => {
        try {
            await axios.delete("http://localhost:5000/logout");
            navigate("/")
        } catch (error) {
            
        }
      }
      

    return (
    <div>
        <div>
            <nav className="navbar navbar-light bg-light justify-content-between">
                <a href="/home" className="navbar-brand">{username}</a>
                <form className="form-inline">
                    <button onClick={Logout} className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
                </form>
            </nav>

            <div>
                <h1 className="text-center">Product List</h1>
                    <Link style={{textDecoration: 'none'}} to="add" className="button is-succes">Add New Product</Link>
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
                                        <Link style={{textDecoration: 'none'}} to={`edit/${product.id}`}
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

    )
    
}

export default HomePage;




