import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className='product-card'>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>Price: {product.price}</p>
      <button className='view-details-button'>
        <Link to={`/product/${product.id}`}>View Details</Link>
      </button>
    </div>
  );
};

export default ProductCard;
