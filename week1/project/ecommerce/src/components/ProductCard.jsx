import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className='product-card' key={product.id}>
      <h3>{product.title}</h3>
      <img src={product.image} alt={product.title} />
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductCard;
