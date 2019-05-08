import React from 'react';

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className='current-users'>{props.userCount}</span>
    </nav>
  )
}

export default Navbar;