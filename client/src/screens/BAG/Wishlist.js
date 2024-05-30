import { useDispatch, useSelector } from 'react-redux';
import WishlistProduct from './WishlistProduct';
import { useEffect } from 'react';
import { getWishListProducts } from '../../features/wishlistSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistProducts, totalWishProducts } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(getWishListProducts());
  }, [dispatch, totalWishProducts]);

  return (
    <section className="mb-10 h-full w-full">
      <div className="flex flex-col items-center justify-center py-6">
        <h2 className="font-bold">YOUR SHOPPING WISHLIST</h2>
      </div>
      <div className="mt-5 h-full">
        {' '}
        <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex w-full flex-col items-start justify-start bg-gray-100 px-4 py-4 md:p-6 md:py-6 xl:p-8 ">
            <p className="text-lg font-semibold leading-6 text-gray-800 md:text-xl xl:leading-5 ">
              Your Wishlist
            </p>

            {/* Product */}
            {totalWishProducts === 0 ? (
              <p className="text-lg font-semibold leading-6 text-gray-800 md:text-xl xl:leading-5 ">
                Your Wishlist is Empty
              </p>
            ) : (
              wishlistProducts &&
              wishlistProducts.map((data, index) => (
                <WishlistProduct data={data} key={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
