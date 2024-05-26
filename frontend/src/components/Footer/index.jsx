import React from 'react';
import { NavLink } from 'react-router-dom'; 
import "./style.css"


function Footer() {
  return (
    <footer className="footer">
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/category">Shop</NavLink>
      <NavLink  to="/contactUs" >Contact Us</NavLink>
      <NavLink  to="/about">About</NavLink>
    </footer>
  );
}

export default Footer;
