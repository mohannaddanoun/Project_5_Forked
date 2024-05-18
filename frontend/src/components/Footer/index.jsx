import React from 'react';
import { NavLink } from 'react-router-dom'; 
import "./style.css"

function Footer() {
  return (
    <footer className="footer">
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/category">Category</NavLink>
      <NavLink  to="/">Contact Us</NavLink>
      <NavLink  to="/">About</NavLink>
    </footer>
  );
}

export default Footer;
