import React from 'react';
import PaymentList from '../../components/Dashboard/Payment/PaymentList';

function Payment() {
  return (
    <>
      <div className="h-screen w-full ">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-black text-opacity-80">
            Payment
          </h1>
          <p className="mt-1 cursor-pointer text-sm font-medium text-black text-opacity-50 underline">
            {'> dashboard > payment'}
          </p>
        </div>
        <div className="mb-4 w-full p-3">
          <PaymentList />
        </div>
      </div>
    </>
  );
}

export default Payment;
