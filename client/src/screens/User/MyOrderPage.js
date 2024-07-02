import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders, getOrders } from '../../features/orderSlice';

const Myorders = () => {
  const { order } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userId = userInfo._id;
  // const orderId = `6659f1d26e81ba01f532a072`;

  console.log(order);
  console.log(userId);
  useEffect(() => {
    // dispatch(getMyOrders({ userId, orderId }));
    dispatch(getOrders({ userId }));
  }, [dispatch]);

  return (
    <div className="w-full rounded-md bg-white p-8">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-600">My Order</h2>
          <span className="text-xs">All products</span>
        </div>
      </div>
      <div>NO DATA HERE</div>
    </div>
  );
};

export default Myorders;
