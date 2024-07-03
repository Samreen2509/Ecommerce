import React, { useEffect } from 'react';
import DashCard from '../../components/Dashboard/Dashboard/DashCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../features/dashboardSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products);
  return (
    <>
      <div className="h-screen w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-black text-opacity-80">
            Dashboard
          </h1>
          <p className="mt-1 cursor-pointer text-sm font-medium text-black text-opacity-50 underline">
            {'> dashboard'}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 p-3">
          <DashCard
            name="PRODUCTS"
            value={products ? products.length : '0'}
            link="./product"
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
