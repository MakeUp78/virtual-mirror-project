import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Virtual Mirror
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/products" className="navbar-link">Products</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/cart" className="navbar-link">
                  Cart ({getCartCount()})
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/orders" className="navbar-link">Orders</Link>
              </li>
              <li className="navbar-item">
                <Link to="/profile" className="navbar-link">
                  {user?.name || 'Profile'}
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={logout} className="navbar-link navbar-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
