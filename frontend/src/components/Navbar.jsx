import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
        <a href="/home" className="navbar-brand">User</a>
        <form className="form-inline">
            <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
        </form>
    </nav>
  )
}

export default Navbar