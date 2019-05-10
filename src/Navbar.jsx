/* eslint-disable react/prop-types */
import React from 'react';

// Navbar Component that shows the current user count
const Navbar = (props) => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className='current-users'>{props.userCount}</span>
    </nav>
  )
}

export default Navbar;