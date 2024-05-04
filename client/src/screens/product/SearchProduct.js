import React from 'react';
import CategoryPage from '../../components/Home/CategoryCard';
import { useParams } from 'react-router-dom';

function SearchProduct() {
  const { query } = useParams();

  // Use the query parameter for fetching search results, etc.
  console.log(query);
  return (
    <div>
      <CategoryPage />
    </div>
  );
}

export default SearchProduct;
