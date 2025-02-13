import React from "react"; 
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/" className="navlink">Home</NavLink>
      <NavLink to="/posts/new" className="navlink">New Post</NavLink>
    </nav>
  );
}


