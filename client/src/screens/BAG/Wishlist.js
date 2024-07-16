import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWishListProducts } from '../../features/wishlistSlice';
import ProductCard from '../product/ProductCards';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistProducts, totalWishProducts } = useSelector(
    (state) => state.wishlist
  );
  const { isUserLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isUserLogin) {
      dispatch(getWishListProducts());
    }
  }, [dispatch]);

  return (
    <section className="mt-3 h-full w-full">
      <div className="flex flex-col items-center justify-center">
        <h2 className="m-auto text-2xl font-bold md:text-4xl lg:my-10 lg:text-5xl">
          Your Wishlist
        </h2>
      </div>
      <div className="mt-5 h-full">
        <div className="flex w-full flex-col items-center justify-start md:space-y-6 xl:space-y-8">
          <div className="flex flex-wrap items-start justify-start gap-x-9 gap-y-9 rounded-md lg:w-[90vw] xl:p-8 ">
            {/* Product */}
            {totalWishProducts === 0 ? (
              <p className="text-lg font-semibold leading-6 text-gray-800 md:text-xl xl:leading-5 ">
                Your Wishlist is Empty
              </p>
            ) : (
              wishlistProducts?.map((data, index) => (
                <ProductCard sdata={data?.product} key={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
