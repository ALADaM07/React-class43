import React, { useState } from 'react';
import allProducts from './fake-data/all-products';
import './App.css';
import ProductCard from './components/ProductCard';
import CategoryButton from './components/CategoryButton';
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
        <CategoryButton
          category='all'
          activeCategory={category}
          handleCategoryChange={handleCategoryChange}
        />
        <CategoryButton
          category="men's clothing"
          activeCategory={category}
          handleCategoryChange={handleCategoryChange}
        />
        <CategoryButton
          category="women's clothing"
          activeCategory={category}
          handleCategoryChange={handleCategoryChange}
        />
        <CategoryButton
          category='jewelery'
          activeCategory={category}
          handleCategoryChange={handleCategoryChange}
        />
        <CategoryButton
          category='electronics'
          activeCategory={category}
          handleCategoryChange={handleCategoryChange}
        />
      </div>

      <h2>FAKE Products</h2>
      <div className='product-list'>
        {filteredProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default App;
