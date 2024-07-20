import React from 'react';
import { Link } from 'react-router-dom';

function DashCard({ name, value, link }) {
  return (
    <>
      <div className="flex h-36 w-full min-w-[18vw] flex-col items-center justify-center">
        <Link
          to={link}
          className="flex h-full w-full flex-col items-center justify-center rounded-md border p-5 hover:bg-gray-200"
        >
          <h1 className="mb-1 w-full text-center text-4xl font-medium text-black text-opacity-75">
            {value}
          </h1>
          <p className="w-full text-center text-base font-medium capitalize text-opacity-75">
            {name}
          </p>
        </Link>
      </div>
    </>
  );
}

export default DashCard;
