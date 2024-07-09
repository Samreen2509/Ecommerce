import React, { useEffect } from 'react';
import CategoryCard from './CategoryCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../features/categorySlice';
import Shimmer from '../../components/Loading/Shimmer.js';

function Category() {
  const { categories, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="items-cente mt-10 flex h-auto w-full flex-col">
      <h1 className=" m-auto text-2xl font-bold md:text-4xl lg:text-5xl">
        All Category
      </h1>
      <div className="mb-20 mt-10 flex flex-wrap justify-center gap-x-10 gap-y-10">
        {categories &&
          categories?.data?.categoryInfo
            ?.filter(
              (category) =>
                category.name === 'men' ||
                category.name === 'women' ||
                category.name === 'kids' ||
                category.name === 'unisex'
            )
            .map((category, index) => (
              <CategoryCard key={index} sdata={category} />
            ))}
      </div>
    </div>
  );
}

export default Category;
