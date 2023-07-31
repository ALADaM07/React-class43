import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CategoryButton from './components/CategoryButton';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(['all', ...data]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError('Failed to fetch categories.');
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    setIsLoading(true);
    setError(null);

    const endpoint =
      selectedCategory === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${selectedCategory}`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError('Failed to fetch products.');
        console.error('Error fetching products:', error);
      });
  }, [selectedCategory]);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  return (
    <Router>
      <div className='app-container'>
        <Navbar />
        <div className='app-content'>
          <h1>FAKE WEB SHOP</h1>
          <div className='category-buttons'>
            {categories.map((category) => (
              <CategoryButton
                key={category}
                category={category}
                activeCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
              />
            ))}
          </div>
          <h2>FAKE Products</h2>
          <Routes>
            <Route
              path='/'
              element={
                isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  <div className='product-list'>
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )
              }
            />
            <Route path='/product/:id' element={<ProductDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
