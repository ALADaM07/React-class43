import React, { useState } from 'react';
import allProducts from './fake-data/all-products';
import './App.css';

const App = () => {
  const [category, setCategory] = useState('all');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const filteredProducts =
    category === 'all'
      ? allProducts
      : allProducts.filter((product) => product.category === category);

  return (
    <div>
      <h1>FAKE WEB SHOP</h1>
      <div className='category-buttons'>
        <button
          className={category === 'all' ? 'active' : ''}
          onClick={() => handleCategoryChange('all')}>
          All
        </button>
        <button
          className={category === "men's clothing" ? 'active' : ''}
          onClick={() => handleCategoryChange("men's clothing")}>
          Men's Clothing
        </button>
        <button
          className={category === "women's clothing" ? 'active' : ''}
          onClick={() => handleCategoryChange("women's clothing")}>
          Women's Clothing
        </button>
        <button
          className={category === 'jewelery' ? 'active' : ''}
          onClick={() => handleCategoryChange('jewelery')}>
          Jewelry
        </button>
        <button
          className={category === 'electronics' ? 'active' : ''}
          onClick={() => handleCategoryChange('electronics')}>
          Electronics
        </button>
      </div>

      <h2>FAKE Products</h2>
      <div className='product-list'>
        {filteredProducts.map((product) => (
          <div className='product-card' key={product.id}>
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} />
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
