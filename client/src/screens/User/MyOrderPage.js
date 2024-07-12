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
    <div className="w-full rounded-md bg-white p-8">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-600">My Order</h2>
          <span className="text-xs">All products</span>
        </div>
      </div>
      <div className="">
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
