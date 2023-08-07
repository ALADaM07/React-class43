import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';

const Navbar = () => {
  const { favorites } = useFavorites();

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/favorites'>Favorites ({favorites.length}) </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
