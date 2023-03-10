import React from "react";
import { Link } from "react-router-dom";
import cookies from 'react-cookies'

export const Navbar = ({user,setUser}) => {
  const logout=()=>{
setUser(null)
cookies.remove('token')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          <img src="/assets/logo300.png" width={54} alt="logo" />{" "}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                User List
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item" onClick={logout}>
                  <Link className="nav-link" to="/login">
                    Logout
                  </Link>
                </li>
                <li className="nav-item" >
                  <Link className="nav-link" to="/message">
                    My Message
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
