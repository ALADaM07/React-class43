import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className='App'>
      <h1>Fake Products</h1>
      <div className='category-buttons'>
        <button onClick={() => filterProducts('all')}>All</button>
        {categories.map((category) => (
          <button key={category} onClick={() => filterProducts(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className='product-list'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='product-card'>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
