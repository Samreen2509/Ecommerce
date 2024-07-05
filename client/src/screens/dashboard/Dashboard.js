import React, { useEffect } from 'react';
import DashCard from '../../components/Dashboard/Dashboard/DashCard';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsCount, getProducts } from '../../features/dashboardSlice';
import { FaSpinner } from 'react-icons/fa';

function Dashboard() {
  const dispatch = useDispatch();
  const { itemCounts, isLoading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getItemsCount());
  }, [dispatch]);

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
          {isLoading ? (
            <FaSpinner className="animate-spin" size={20} />
          ) : (
            itemCounts &&
            itemCounts.map((e, index) => (
              <DashCard
                name={e[0]}
                key={index}
                value={e[1]}
                link={`./${e[0]}`}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
