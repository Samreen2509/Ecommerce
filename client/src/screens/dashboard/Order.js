import React from 'react';
import OrderList from '../../components/Dashboard/Order/OrderList';

function Order() {
  return (
    <>
      <div className="h-screen w-full ">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-black text-opacity-80">
            Product
          </h1>
          <p className="mt-1 cursor-pointer text-sm font-medium text-black text-opacity-50 underline">
            {'> dashboard > product'}
          </p>
        </div>
        <div className="mb-4 w-full p-3">
          <OrderList />
        </div>
      </div>
    </>
  );
}

export default Order;
