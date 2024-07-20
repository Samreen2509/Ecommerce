import React, { useEffect } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts } from '../../features/cartSlice';
import { createNewOrder } from '../../features/orderSlice';
import OrderAddressPage from './OrderAddressPage';

function PlaceOrderPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartProducts, cartTotalPrice, isLoading } = useSelector(
    (state) => state.cart
  );
  const { paymentUrl, selectaddress, loading } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl.url;
    }
  }, [paymentUrl]);

  const handleSubmit = () => {
    const items = cartProducts.map((item) => ({
      productId: item?.product?._id,
      quantity: item?.quantity,
      size: item?.size,
    }));

    const userId = userInfo._id;
    try {
      if (selectaddress) {
        const data = {
          items,
          addressId: selectaddress,
          paymentMethod: 'ONLINE',
        };
        dispatch(createNewOrder({ data, userId }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3 flex h-full w-full flex-col items-center justify-center">
      <h2 className="m-auto text-2xl font-bold md:text-4xl lg:my-10 lg:text-5xl">
        Payment
      </h2>
      <div className="relative bottom-0 grid h-full w-full px-2 md:grid-cols-2 md:px-10">
        <OrderAddressPage />
        {/* Side box */}
        <div className="h-screen w-full pt-5">
          <div className="mt-4 select-none overflow-x-auto rounded-md border bg-white text-black">
            <div className="overflow-x-auto">
              <table className="min-w-full whitespace-nowrap text-left text-sm">
                <thead className="border uppercase tracking-wider">
                  <tr>
                    <th
                      colSpan="2"
                      className="border-b px-6 py-4 text-center text-xl"
                    >
                      Order Summary
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border">
                    <td className="border-x px-6 py-4 font-semibold">
                      SHIPPING
                    </td>
                    <td className="border-x px-6 py-4">
                      ₹0{' '}
                      <span className="opacity-70">
                        (special member discount)
                      </span>
                    </td>
                  </tr>

                  <tr className="border">
                    <td className="border-x px-6 py-4 font-semibold">TOTAL</td>
                    <td className="border-x px-6 py-4">
                      ₹
                      {cartTotalPrice && isLoading ? (
                        <VscLoading className="animate-spin" />
                      ) : (
                        cartTotalPrice.toFixed(0)
                      )}
                    </td>
                  </tr>
                  <tr className="border">
                    <td colSpan={2} className="w-full border px-6 py-4">
                      <button
                        disabled={!selectaddress}
                        onClick={handleSubmit}
                        className={`${!selectaddress ? 'cursor-not-allowed bg-primary-light' : 'cursor-pointer'} flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-base text-white shadow-md shadow-primary-dark hover:bg-primary-light`}
                      >
                        {loading ? (
                          <VscLoading className="animate-spin" />
                        ) : (
                          'Payment'
                        )}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;
