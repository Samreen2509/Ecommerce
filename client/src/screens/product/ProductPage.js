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
import { CiFilter } from 'react-icons/ci';
import { FilterCategory } from './filterProduct.js';

function ProductPage() {
  const { products, loading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const [isCategoyInLargeDiv, setIsCategoyInLargeDiv] = useState(false);
  const [isSizeInlargeDiv, setIsSizeInlargeDiv] = useState(false);
  const [isPriceInlargeDiv, setIsPriceInlargeDiv] = useState(false);
  const [IsCallFilterData, setIsCallFilterData] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [checkboxState, setCheckboxState] = useState(false);
  const displayProductSize = ['XS', 'S', 'M', 'L', 'XL', 'XXL']; // All sizes to display
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProducts({ page }));
    dispatch(getAllCategory());
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredProduct([]);
    setPage(1);
  }, [IsCallFilterData]);

  const totalPages = IsCallFilterData
    ? Math.ceil(filteredProduct.length / 4)
    : Math.ceil((products?.data?.productInfo.length || 1) / 4);

  // const filterCategoryData = (id) => {
  //   setIsCallFilterData(true);
  //   dispatch(getOneCategory(id));
  //   const filteredData =
  //     products.data?.productInfo.filter((product) => product.category === id) ||
  //     [];
  //   setFilteredProduct(filteredData);
  // };

  const filterSizeData = (productSize) => {
    setIsCallFilterData(true);
    const filteredData = products.data?.productInfo.filter(
      (product) => product.size === productSize
    );
    setFilteredProduct(filteredData);
  };

  if (loading) {
    return <Shimmer />;
  }

  const renderProducts = (productList) => (
    <>
      {productList.map((product) => (
        <ProductCard sdata={product} key={product._id} />
      ))}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );

  return (
    <div className="body m-auto">
      <div className="mt-5 flex flex-col justify-center md:flex-row lg:flex-row">
        {/* Filter section */}
        <div className="m-5 hidden md:block lg:block">
          <h3 className=" font-bold">FILTERS</h3>
          <div className="">
            {/* CATEGORIES */}
            {/* <div className="w-56 border-2 border-gray-200 p-3">
              <div>
                <div className="flex justify-between">
                  <h4 className="mb-2">CATEGORIES</h4>
                  <h3
                    onClick={() => setIsInLargeDiv(!isCategoyInLargeDiv)}
                    className=" cursor-pointer"
                  >
                    {isPriceInlargeDiv ? '+' : '-'}
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
                      onClick={() =>
                        filterCategoryData(category._id, !checkboxState)
                      }
                    />
                    <label htmlFor={category._id}>{category.name}</label>
                  </div>
                ))}
              </div>
            </div> */}
            {/* <div className="w-56 border-t-2 border-gray-200 p-3 md:w-60 md:p-4 lg:w-80 lg:p-5">
              <div>
                <div className="flex justify-between">
                  <h4 className="mb-2 text-sm md:text-base lg:text-base">
                    CATEGORIES
                  </h4>
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
                      onClick={() =>
                        filterCategoryData(category._id, !checkboxState)
                      }
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
            
            </div> */}
            <FilterCategory categories={categories} products={products} />

            {/* SIZE */}
            {/* <div className="w-56 border-2 border-gray-200 p-3">
              <div>
                <div className="flex justify-between">
                  <h4 className="mb-2">SIZE</h4>
                  <h3
                    onClick={() => setIsSizeInlargeDiv(!isSizeInlargeDiv)}
                    className=" cursor-pointer"
                  >
                    {isPriceInlargeDiv ? '+' : '-'}
                  </h3>
                </div>
                {displayProductSize.map((size, index) => (
                  <div
                    className="flex items-center gap-2"
                    style={{ display: isSizeInlargeDiv ? 'block' : 'none' }}
                    key={index}
                  >
                    <input
                      type="checkbox"
                      id={index}
                      className="m-1 text-black"
                      onClick={() => filterSizeData(size)}
                    />
                    <label htmlFor={index}>{size}</label>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="w-56 border-t-2 border-gray-200 p-3 md:w-60 md:p-4 lg:w-80 lg:p-5">
              <div>
                <div className="flex justify-between">
                  <h4 className="mb-2 text-sm md:text-base lg:text-base">
                    SIZE
                  </h4>
                  <h3
                    onClick={() => setIsSizeInlargeDiv(!isSizeInlargeDiv)}
                    className="cursor-pointer text-xl"
                  >
                    {isSizeInlargeDiv ? '-' : '+'}
                  </h3>
                </div>
                {displayProductSize.map((size, index) => (
                  <div
                    className="flex items-center gap-2"
                    style={{ display: isSizeInlargeDiv ? 'block' : 'none' }}
                    key={index}
                  >
                    <input
                      type="checkbox"
                      id={index}
                      className="m-1 text-black"
                      onClick={() => filterSizeData(size)}
                    />
                    <label
                      htmlFor={index}
                      className="text-sm md:text-base lg:text-base"
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICE */}
            {/* <div className="w-56 border-2 border-gray-200 p-3">
              <div>
                <div className="flex justify-between">
                  <h4 className="mb-2">PRICE</h4>
                  <h3
                    onClick={() => setIsPriceInlargeDiv(!isPriceInlargeDiv)}
                    className=" cursor-pointer"
                  >
                    {isPriceInlargeDiv ? '+' : '-'}
                  </h3>
                </div>
                {products.data?.productInfo?.map((product) => (
                  <div
                    className="flex items-center gap-2"
                    style={{ display: isPriceInlargeDiv ? 'block' : 'none' }}
                    key={product._id}
                  >
                    <input
                      type="checkbox"
                      id={product._id}
                      className="m-1 text-black"
                      onClick={() => filterSizeData(product._id)}
                    />
                    <label htmlFor={product._id}>{product.price}</label>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="w-56 border-t-2 border-gray-200 p-3 md:w-60 md:p-4 lg:w-80 lg:p-5">
              <div>
                <div className="flex justify-between">
                  <h4 className="mb-2 text-sm md:text-base lg:text-base">
                    PRICE
                  </h4>
                  <h3
                    onClick={() => setIsPriceInlargeDiv(!isPriceInlargeDiv)}
                    className="cursor-pointer text-xl"
                  >
                    {isPriceInlargeDiv ? '-' : '+'}
                  </h3>
                </div>
                {products.data?.productInfo?.map((product) => (
                  <div
                    className="flex items-center gap-2"
                    style={{ display: isPriceInlargeDiv ? 'block' : 'none' }}
                    key={product._id}
                  >
                    <input
                      type="checkbox"
                      id={product._id}
                      className="m-1 text-black"
                      onClick={() => filterSizeData(product._id)}
                    />
                    <label
                      htmlFor={product._id}
                      className="text-sm md:text-base lg:text-base"
                    >
                      {product.price}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product section */}
        <div className="mt-5 h-auto w-full md:mt-32 lg:mt-32">
          {/* Large, Medium screen */}
          <h1 className=" m-2 hidden  font-bold md:ml-10 md:block md:text-3xl lg:ml-10 lg:block lg:text-5xl">
            All Products
          </h1>
          {/* Small screen */}
          <div className="block md:hidden lg:hidden">
            <div className="flex items-center justify-between ">
              <h1 className=" m-2 text-2xl font-bold">All Products</h1>
              <div className="flex cursor-pointer items-center gap-1">
                <CiFilter className=" text-lg font-bold" />
                <h3 className=" font-bold">FILTERS</h3>
              </div>
            </div>
            <img
              src="https://img.freepik.com/free-vector/fashion-sale-landing-page-style_23-2148590924.jpg?w=996&t=st=1720523899~exp=1720524499~hmac=8a969de90507ba239aab1a1837a39b2db051b85c10490f10d6e21fd9bea028b0"
              alt="product-banner"
            />
          </div>
          {/* Large, Medium, Small screen */}
          <div className="mb-32 mt-10 flex flex-wrap justify-center gap-y-10 md:gap-x-5 lg:gap-x-10">
            {!IsCallFilterData ? (
              products.data?.productInfo.length ? (
                renderProducts(products.data.productInfo)
              ) : (
                <div className="mr-24 mt-20">
                  <h1 className="text-3xl">Product is not available</h1>
                </div>
              )
            ) : filteredProduct.length ? (
              renderProducts(filteredProduct)
            ) : (
              <div className="mr-24 mt-20">
                <h1 className="text-3xl">Product is not available</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
