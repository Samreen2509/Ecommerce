import { Link } from 'react-router-dom';
import BagProduct from './BagProduct';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts } from '../../features/cartSlice';
import { VscLoading } from 'react-icons/vsc';

const Bag = () => {
  const { cartProducts, cartTotalPrice, updateCart, isLoading } = useSelector(
    (state) => state.cart
  );

  const { isUserLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLogin) {
      dispatch(getCartProducts());
    }
  }, [dispatch, updateCart]);

  return (
    <section className="mt-3 flex h-full w-full flex-col items-center justify-center">
      <h2 className="m-auto text-2xl font-bold md:text-4xl lg:my-10 lg:text-5xl">
        Your Bag
      </h2>
      <div className="gird my-4 grid h-full w-full grid-cols-1 gap-4 px-5 lg:grid-cols-3">
        {/* Product section */}
        <div className="h-full lg:col-span-2">
          <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex w-full flex-col items-start justify-start rounded-md border-2 px-4 py-4 md:p-6 md:py-6 xl:p-8 ">
              {/* Product */}

              {cartProducts &&
                cartProducts.map((data, index) => (
                  <BagProduct
                    mainImage={data?.product?.mainImage}
                    price={data?.product?.price}
                    name={data?.product?.name}
                    _id={data?.product?._id}
                    color={data?.product?.color}
                    preQuantity={data?.quantity}
                    key={index}
                    isLoading={isLoading}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="sticky top-0 h-full">
          <div className="flex w-full flex-col space-y-6 rounded-md border-2 bg-gray-100 px-4 py-6 md:p-6 xl:p-8">
            <h3 className="text-xl font-semibold leading-5 text-gray-800 ">
              Summary
            </h3>
            <div className="flex w-full flex-col items-center justify-center space-y-4 border-b border-gray-200 pb-4">
              <div className="flex w-full justify-between">
                <p className="text-base leading-4 text-gray-800 ">Subtotal</p>
                <p className="text-base leading-4 text-gray-600 ">
                  ₹{cartTotalPrice && cartTotalPrice.toFixed(0)}
                </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-base font-semibold leading-4 text-gray-800">
                Total
              </p>
              <p className="flex text-base font-semibold leading-4 text-gray-600">
                {cartTotalPrice && isLoading ? (
                  <VscLoading className="animate-spin" />
                ) : (
                  `₹ ${cartTotalPrice.toFixed(0)}`
                )}
              </p>
            </div>
            <Link
              to="/placeOrder/payment"
              className="flex w-full items-center justify-between"
            >
              <button
                disabled={cartProducts.length === 0}
                className="w-full rounded-md bg-primary px-5 py-2 text-xl font-semibold text-white hover:bg-primary-light"
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bag;
