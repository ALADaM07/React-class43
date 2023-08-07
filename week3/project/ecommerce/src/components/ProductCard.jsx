import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import regularHeart from '../assets/heart-regular.svg';
import solidHeart from '../assets/heart-solid.svg';
import { useFavorites } from './FavoritesContext';

const ProductCard = ({ product }) => {
  const [isHeartSolid, setIsHeartSolid] = useState(false);
  const { favorites, setFavorites } = useFavorites();

  useEffect(() => {
    setIsHeartSolid(
      favorites.some((favProduct) => favProduct.id === product.id)
    );
  }, [favorites, product.id]);

  const toggleHeart = () => {
    setIsHeartSolid((prevIsHeartSolid) => {
      if (!prevIsHeartSolid) {
        setFavorites((prevFavorites) => [...prevFavorites, product]);
      } else {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.id !== product.id)
        );
      }
      return !prevIsHeartSolid;
    });
  };

  return (
    <div className='product-card'>
      <img className='product-img' src={product.image} alt={product.title} />
      <img
        className='heart-fav'
        src={isHeartSolid ? solidHeart : regularHeart}
        alt='Favorite'
        onClick={toggleHeart}
        style={{ cursor: 'pointer' }}
      />
      <h3>{product.title}</h3>
      <p>Price: {product.price}</p>
      <button className='view-details-button'>
        <Link to={`/product/${product.id}`}>View Details</Link>
      </button>
    </div>
  );
};

export default ProductCard;
