import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../../features/cartSlice';
function OrderSuccessPage() {
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (count === 0) {
    navigate('/myorders');
  }
  return (
    <div className="h-full bg-gray-100">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="h-17 mx-auto my-6 w-16 animate-pulse text-green-600"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
            Payment Done!
          </h3>
          <p className="my-2 text-gray-600">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <p> Redirect To Homepage </p>
          <p> {count} </p>

          <div className="py-10 text-center">
            <Link
              to="/myorders"
              className="bg-indigo-600 px-12 py-3 font-semibold text-white hover:bg-indigo-500"
            >
              My Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
