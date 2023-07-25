import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:5000/users", {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
          })
          navigate("/")
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
          <div className="col-10 col-md-7 col-lg-7 col-xl-6">
            <div className="card" >
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-3"><strong>Sign-Up</strong></h2>
                
                <form onSubmit={Register}>
                  <p className='text-center'>{msg}</p>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input type="text" id="username" 
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    className="form-control form-control-lg" />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="emial">Email</label>
                    <input type="email" id="email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-lg" 
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="form-control form-control-lg" />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" 
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control form-control-lg" />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button type="submit" 
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-100">Register</button>
                  </div>

                  <p className="text-center text-muted mt-3 mb-0">Have already an account? <Link to="/"
                      className="fw-bold text-body"><u>Login here</u></Link></p>
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

export default Register;