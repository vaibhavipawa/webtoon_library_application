import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {token ? (
          <>
            <li><Link to="/favorites">My Favorites</Link></li>
            <li><button onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
