import React, { useEffect } from 'react';
import CategoryCard from './CategoryCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../features/categorySlice';
// import Shimmer from '../../components/Loading/Shimmer.js';
import { Link } from 'react-router-dom';

function Category() {
  const { categories, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  console.log(categories);

  return (
    <div className="min-h-min">
      <div className="mx-48 my-8 text-5xl font-bold">
        <h1>All Category</h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {categories &&
          categories?.data?.map((category) => (
            <Link
              to={`/category/${category._id}`}
              key={category._id}
              className="link"
            >
              <CategoryCard sdata={category} />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Category;
