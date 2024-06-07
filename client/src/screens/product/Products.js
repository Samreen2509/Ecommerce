import ProductCard from './ProductCards.js';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from '../../features/productSlice.js';
import Shimmer from '../../components/Loading/Shimmer.js';
import { getWishListProducts } from '../../features/wishlistSlice.js';

const Products = () => {
  const { id } = useParams();
  const { products, loading } = useSelector((state) => state.product);
  const { isUserLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log('products:', products);
  useEffect(() => {
    dispatch(getAllProducts());
    if (isUserLogin) {
      dispatch(getWishListProducts());
    }
  }, [dispatch]);

  console.log('products:', products);

  const singleCategoryProduct =
    products?.data?.productInfo?.filter((product) => product.category === id) ||
    [];

  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="min-h-min">
        <div className="mx-48 text-5xl font-bold">
          <h1>Shop By Category</h1>
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
