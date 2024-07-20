import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../features/orderSlice';
import ProductOrder from './ProductOrder';

const Myorders = () => {
  const { order } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userId = userInfo._id;

  useEffect(() => {
    dispatch(getOrders({ userId }));
  }, []);

  return (
    <div className="mt-3 flex w-full flex-col items-center justify-center rounded-md bg-white">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col items-center justify-center">
          <h2 className="m-auto text-2xl font-bold md:text-4xl lg:my-10 lg:text-5xl">
            My Orders
          </h2>
        </div>
      </div>
      <div className="rounded-md border-2 px-10 lg:w-[90vw]">
        {order.length === 0 ? (
          <div>No orders found</div>
        ) : (
          order.map((order, index) => (
            <ProductOrder key={index} orderData={order} />
          ))
        )}
      </div>
    </div>
  );
};

export default Myorders;
