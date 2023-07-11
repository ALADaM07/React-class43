import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      });
  }, []);

  const filterProducts = (category) => {
    if (category === 'All') {
      setFilteredProducts(products);
      setSelectedCategory('All');
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
      setSelectedCategory(category);
    }
  };

  return (
    <div className='App'>
      <h1>Web Shop</h1>
      <div className='category-buttons'>
        <button
          onClick={() => filterProducts('All')}
          className={selectedCategory === 'All' ? 'active' : ''}>
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterProducts(category)}
            className={selectedCategory === category ? 'active' : ''}>
            {category}
          </button>
        ))}
      </div>
      <div className='selected-category'>
        Selected Category: {selectedCategory}
      </div>
      <div className='product-list'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='product-card'>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
