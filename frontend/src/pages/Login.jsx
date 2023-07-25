import React, {useState} from 'react'
import { Link,  useNavigate} from 'react-router-dom'
import axios from 'axios';


function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
})

const navigate = useNavigate();

const handleSubmit = (event) => {
  event.preventDefault();

  axios.post("http://localhost:5000/login", values)
  .then(res => {
    if(res.data.Status === 'Success') {
        navigate("/home")
    } else {
      alert(res.data.Error)
    }
  })
  .then(err => console.log(err))
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

                  <form onSubmit={handleSubmit}>

                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="email"> Email</label>
                      <input type="email" id="email" className="form-control form-control-lg"
                        onChange={e => setValues({...values, email: e.target.value})}
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="passeord">Password</label>
                      <input type="password" id="passeord" className="form-control form-control-lg" 
                          onChange={e => setValues({...values, password: e.target.value})}
                      />
                    </div>

                    <div className="form-check d-flex justify-content-center mb-3">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                      <label className="form-check-label" >
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-100">Login</button>
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