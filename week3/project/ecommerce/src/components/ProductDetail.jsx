import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from './useFetch';

const ProductDetail = () => {
  const { id } = useParams();
  const productFetch = useFetch(`https://fakestoreapi.com/products/${id}`);
  const { data: product, isLoading, error } = productFetch;

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
      <p className='detail-price'>Price: ${product.price}</p>{' '}
      <button>
        <Link to='/'>Go Back</Link>
      </button>
    </div>
  );
};

export default ProductDetail;
