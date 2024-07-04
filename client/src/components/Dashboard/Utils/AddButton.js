import React from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AddButton({ url }) {
  return (
    <>
      <div className="my-4">
        <Link
          to={url ? url : './?id=new&edit=true'}
          className="flex h-10 items-center justify-center rounded-md bg-gray-800 px-5 font-semibold text-white"
        >
          <FaPlusSquare className="mr-3" />
          Add
        </Link>
      </div>
    </>
  );
}

export default AddButton;
