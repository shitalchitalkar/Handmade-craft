import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">🧵 HandmadeCraft</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>

            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="/products" role="button" data-bs-toggle="dropdown">Products</NavLink>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/products">All Products</NavLink></li>
                <li><NavLink className="dropdown-item" to="/products/category/Brass">Brass Handicrafts</NavLink></li>
                <li><NavLink className="dropdown-item" to="/products/category/Metal">Metal Handicrafts</NavLink></li>
                <li><NavLink className="dropdown-item" to="/products/category/Wooden">Wooden Handicrafts</NavLink></li>
                <li><NavLink className="dropdown-item" to="/products/category/Souvenirs">Souvenirs</NavLink></li>
              </ul>
            </li>

            <li className="nav-item"><NavLink className="nav-link" to="/categories">Categories</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item me-2"><NavLink className="nav-link" to="/cart">Cart 🛒</NavLink></li>
            {!user ? (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>
              </>
            ) : (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/profile">Hi, {user.name || user.role}</NavLink></li>
                <li className="nav-item"><button className="btn btn-sm btn-danger ms-2" onClick={logout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}