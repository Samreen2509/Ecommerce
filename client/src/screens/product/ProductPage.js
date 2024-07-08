import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Shimmer from '../../components/Loading/Shimmer.js';
import ProductCard from './ProductCards.js';
import { getAllProducts } from '../../features/productSlice.js';
import {
  getAllCategory,
  getOneCategory,
} from '../../features/categorySlice.js';
import Pagination from './Pagination.js';

function ProductPage() {
  const { products, loading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const [isCategoyInLargeDiv, setIsInLargeDiv] = useState(false);
  const [isSizeInlargeDiv, setIsSizeInlargeDiv] = useState(false);
  const [isPriceInlargeDiv, setIsPriceInlargeDiv] = useState(false);
  const [IsCallFilterData, setIsCallFilterData] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const displayProductSize = ['XS', 'S', 'M', 'L', 'XL', 'XXL']; // All sizes to display
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const totalPages = 3;

  useEffect(() => {
    dispatch(getAllProducts({ page }));
    dispatch(getAllCategory());
  }, [dispatch, page]);

  const filterCategoryData = (id) => {
    setIsCallFilterData(true);
    dispatch(getOneCategory(id));
    const filteredData =
      products.data?.productInfo.filter((product) => product.category === id) ||
      [];

    setFilteredProduct((prevProducts) => [...prevProducts, ...filteredData]);
  };

  const filterSizeData = (productSize) => {
    setIsCallFilterData(true);
    const filteredData = products.data?.productInfo.filter(
      (product) => product.size === productSize || []
    );
    setFilteredProduct((prevProducts) => [...prevProducts, ...filteredData]);
  };

  console.log('filteredProduct:', filteredProduct);

  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="body m-auto">
      <div className="mt-5 flex flex-col justify-center md:flex-row lg:flex-row">
        {/* Filter section */}
        <div className="md:m-32 lg:m-32">
          <h3>FILTERS</h3>
          <div className="flex items-center md:flex-col lg:flex-col">
            {/* CATEGORIES */}
            <div className="w-56 border-2 border-gray-200 p-3">
              <div>
                <div className="flex justify-between">
                  <h4 className="mb-2">CATEGORIES</h4>
                  <h3
                    onClick={() => setIsInLargeDiv(!isCategoyInLargeDiv)}
                    className=" cursor-pointer"
                  >
                    +
                  </h3>
                </div>
                {categories?.data?.categoryInfo?.map((category) => (
                  <div
                    className="flex items-center gap-2"
                    style={{ display: isCategoyInLargeDiv ? 'block' : 'none' }}
                    key={category._id}
                  >
                    <input
                      type="radio"
                      id={category._id}
                      className="m-1 text-black"
                      onClick={() => filterCategoryData(category._id)}
                    />
                    <label htmlFor={category._id}>{category.name}</label>
                  </div>
                ))}
              </div>
            </div>
            {/* SIZE */}
            <div className="w-56 border-2 border-gray-200 p-3">
              <div>
                <div className="flex justify-between">
                  <h4 className="mb-2">SIZE</h4>
                  <h3
                    onClick={() => setIsSizeInlargeDiv(!isSizeInlargeDiv)}
                    className=" cursor-pointer"
                  >
                    +
                  </h3>
                </div>
                {displayProductSize.map((size, i) => (
                  <div
                    className="flex items-center gap-2"
                    style={{ display: isSizeInlargeDiv ? 'block' : 'none' }}
                    key={i}
                  >
                    <input
                      type="radio"
                      id={i}
                      className="m-1 text-black"
                      onClick={() => filterSizeData(size)}
                    />
                    <label htmlFor={i}>{size}</label>
                  </div>
                ))}
              </div>
            </div>
            {/* PRICE */}
            <div className="w-56 border-2 border-gray-200 p-3">
              <div>
                <div className="flex justify-between">
                  <h4 className="mb-2">PRICE</h4>
                  <h3
                    onClick={() => setIsPriceInlargeDiv(!isPriceInlargeDiv)}
                    className=" cursor-pointer"
                  >
                    +
                  </h3>
                </div>
                {products.data?.productInfo?.map((product) => (
                  <div
                    className="flex items-center gap-2"
                    style={{ display: isPriceInlargeDiv ? 'block' : 'none' }}
                    key={product._id}
                  >
                    <input
                      type="radio"
                      id={product._id}
                      className="m-1 text-black"
                      onClick={() => filterDataCall(product._id)}
                    />
                    <label htmlFor={product._id}>{product.price}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Product section */}
        <div className="mt-5 h-auto w-full md:mt-32 lg:mt-32">
          {/* <hr className="block hidden" /> */}
          <h1 className="m-auto ml-10 text-2xl font-bold md:text-3xl lg:text-5xl">
            All Products
          </h1>
          <div className="mb-32 mt-10 flex flex-wrap justify-center gap-x-10 gap-y-10">
            {!IsCallFilterData ? (
              products.data?.productInfo.length ? (
                products.data?.productInfo.map((product) => (
                  <ProductCard sdata={product} />
                ))
              ) : (
                <div className="mr-24 mt-20">
                  <h1 className="text-3xl">Product is not available</h1>
                </div>
              )
            ) : filteredProduct.length ? (
              filteredProduct.map((product) => <ProductCard sdata={product} />)
            ) : (
              <div className="mr-24 mt-20">
                <h1 className="text-3xl">Product is not available</h1>
              </div>
            )}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
