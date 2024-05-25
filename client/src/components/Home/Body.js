import Shimmer from '../Loading/Shimmer.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import CategoryCard from './CategoryCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../features/categorySlice.js';

const Body = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return categories.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div>
        <Carousel />
      </div>
      <div className="min-h-min">
        <div className="mx-48 my-8 text-5xl font-bold">
          <h1>Shop by category</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {categories.data.map((category) => (
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
    </div>
  );
};

export default Body;
