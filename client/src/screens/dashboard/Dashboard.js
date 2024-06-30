import React from 'react';
import DashCard from '../../components/Dashboard/Dashboard/DashCard';

function Dashboard() {
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
          <DashCard name="Order" value="34" link="./order" />
          <DashCard name="Order" value="34" link="./order" />
          <DashCard name="Order" value="34" link="./order" />
          <DashCard name="Order" value="34" link="./order" />
          <DashCard name="Order" value="34" link="./order" />
          <DashCard name="Order" value="34" link="./order" />
          <DashCard name="Order" value="34" link="./order" />
          <DashCard name="Order" value="34" link="./order" />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
