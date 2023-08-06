import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError('Failed to fetch product details.');
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if (isLoading) {
    return <p className='is-loading'>Loading...</p>;
  }

  if (error) {
    return <p className='error-message'>Error: {error}</p>;
  }

  if (!product) {
    return <p className='no-product'>Product not found.</p>;
  }

  return (
    <div className='detail-container'>
      <h2>{product.title}</h2>
      <div className='image-container'>
        <img src={product.image} alt={product.title} />
      </div>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default ProductDetail;
