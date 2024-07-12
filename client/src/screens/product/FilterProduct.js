import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getOneCategory } from '../../features/categorySlice';

export const FilterCategory = ({ categories, products }) => {
  const [isCategoyInLargeDiv, setIsCategoyInLargeDiv] = useState(false);
  const [IsCallFilterData, setIsCallFilterData] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [checkboxState, setCheckboxState] = useState(false);
  const dispatch = useDispatch();

  const filterCategoryData = (id, checkbox) => {
    setCheckboxState(checkbox);
    // if (checkboxState === false) {
    //   const filteredData = filteredData.filter((product) => product.id !== id);
    //   setFilteredProduct(filteredData);
    // }
    setIsCallFilterData(true);
    dispatch(getOneCategory(id));
    const filteredData =
      (products &&
        products.data?.productInfo.filter(
          (product) => product.category === id
        )) ||
      [];
    setFilteredProduct(filteredData);
  };
  console.log('filteredData:', filteredProduct);
  return (
    <div className="w-56 border-t-2 border-gray-200 p-3 md:w-60 md:p-4 lg:w-80 lg:p-5">
      <div>
        <div className="flex justify-between">
          <h4 className="mb-2 text-sm md:text-base lg:text-base">CATEGORIES</h4>
          <h3
            onClick={() => setIsCategoyInLargeDiv(!isCategoyInLargeDiv)}
            className="cursor-pointer text-xl"
          >
            {isCategoyInLargeDiv ? '-' : '+'}
          </h3>
        </div>
        {categories?.data?.categoryInfo?.map((category) => (
          <div
            className="flex items-center gap-2"
            style={{ display: isCategoyInLargeDiv ? 'block' : 'none' }}
            key={category._id}
          >
            <input
              type="checkbox"
              id={category._id}
              className="m-1 text-black"
              onClick={() => filterCategoryData(category._id, !checkboxState)}
            />
            <label
              htmlFor={category._id}
              className="text-sm md:text-base lg:text-base"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FilterSize = ({ product }) => {};
