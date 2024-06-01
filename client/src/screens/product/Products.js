import Shimmer from '../../components/Loading/Shimmer.js';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCards.js';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from '../../features/productSlice.js';

const Products = () => {
  const { id } = useParams();
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  console.log('products:', products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  console.log('products:', products);

  const singleCategoryProduct =
    products.data?.productInfo.filter((product) => product.category === id) ||
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
            singleCategoryProduct.map((product) => (
              <Link
                to={`/singleProduct/${product._id}`}
                className="link"
                key={product._id}
              >
                <ProductCard sdata={product} />
              </Link>
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
