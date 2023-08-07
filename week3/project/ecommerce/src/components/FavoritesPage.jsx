import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';
import ProductCard from './ProductCard';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className='favorite-container'>
      <h2>Favorites ({favorites.length}) </h2>
      {favorites.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div className='product-list'>
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <button>
        <Link to='/'>Go Back</Link>
      </button>
    </div>
  );
};

export default FavoritesPage;
