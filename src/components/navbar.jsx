import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <Link to="/" className="my-0 mr-md-auto">
      <img  className="img-fluid" src="/images/pokemon-logo-p.png" alt="Pokémon-logo" />
    </Link>
    <nav className="my-2 my-md-0 mr-md-3">
      <Link className="p-2 text-dark" to="/">Home</Link>
    </nav>
  </div>
)

export default Navbar;