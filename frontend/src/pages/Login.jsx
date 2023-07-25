import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      navigate("/dashboard")
    } catch (error) {
      if(error.response) {
        setMsg(error.response.data.msg)
      }
    }
}

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" >
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-4"><strong>Sing-In</strong></h2>

                  <form onSubmit={Auth}>
                    <p className='text-center'>{msg}</p>
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="email"> Email</label>
                      <input type="email" id="email" 
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="passeord">Password</label>
                      <input type="password" id="passeord" 
                        value={password} onChange={(e) => setPassword(e.target.value)}
                      className="form-control form-control-lg" 
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-100 mt-3">Login</button>
                    </div>

                    <p className="text-center text-muted mt-3 mb-0">Do not an account? <Link to="/register"
                        className="fw-bold text-body"><u>Register here</u></Link></p>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;