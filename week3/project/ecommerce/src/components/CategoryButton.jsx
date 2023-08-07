import React from 'react';

const CategoryButton = ({ category, activeCategory, handleCategoryChange }) => {
  return (
    <button
      className={category === activeCategory ? 'active' : ''}
      onClick={() => handleCategoryChange(category)}>
      {category === 'all'
        ? 'All'
        : category.charAt(0).toUpperCase() + category.slice(1)}
    </button>
  );
};

export default CategoryButton;