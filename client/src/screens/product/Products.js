import ProductCard from './ProductCards.js';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from '../../features/productSlice.js';
import { getWishListProducts } from '../../features/wishlistSlice.js';

const Products = () => {
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getWishListProducts());
  }, [dispatch]);

  const singleCategoryProduct =
    products?.data?.productInfo?.filter((product) => product.category === id) ||
    [];

  return (
    <div className="body">
      <div className="min-h-min">
        <div className="mx-48 text-5xl font-bold">
          <h1>Shop by category</h1>
        </div>

        <div className="flex flex-wrap justify-center">
          {singleCategoryProduct.length !== 0 ? (
            singleCategoryProduct.map((product, index) => (
              <ProductCard sdata={product} key={index} />
            ))
          ) : (
            <div className="mr-24 mt-20">
              <h1 className="text-3xl">Product is not available</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
