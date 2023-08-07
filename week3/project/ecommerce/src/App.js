import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CategoryButton from './components/CategoryButton';
import { FavoritesProvider } from './components/FavoritesContext';
import FavoritesPage from './components/FavoritesPage';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import useFetch from './components/useFetch';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const categoriesFetch = useFetch(
    'https://fakestoreapi.com/products/categories'
  );
  const productsFetch = useFetch(
    selectedCategory === 'all'
      ? 'https://fakestoreapi.com/products'
      : `https://fakestoreapi.com/products/category/${selectedCategory}`
  );

  useEffect(() => {
    if (!categoriesFetch.isLoading && !categoriesFetch.error) {
      setCategories(categoriesFetch.data || []);
    }
  }, [categoriesFetch]);

  useEffect(() => {
    if (!productsFetch.isLoading && !productsFetch.error) {
      setProducts(productsFetch.data || []);
    }
  }, [productsFetch]);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  return (
    <Router>
      <FavoritesProvider>
        <div className='app-container'>
          <Navbar />
          <div className='app-content'>
            <Routes>
              <Route
                path='/'
                element={
                  <>
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
                    {productsFetch.isLoading ? (
                      <p>Loading products...</p>
                    ) : productsFetch.error ? (
                      <p>Error: {productsFetch.error}</p>
                    ) : (
                      <div className='product-list'>
                        {products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    )}
                  </>
                }
              />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/favorites' element={<FavoritesPage />} />
            </Routes>
          </div>
        </div>
      </FavoritesProvider>
    </Router>
  );
};

export default App;
