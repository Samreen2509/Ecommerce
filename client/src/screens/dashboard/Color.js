import React from 'react';
import ColorList from '../../components/Dashboard/Color/ColorList';
import ColorEdit from '../../components/Dashboard/Color/ColorEdit';
import { useLocation } from 'react-router-dom';

function Color() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const edit = searchParams.get('edit');

  return (
    <>
      <div className="h-screen w-full ">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-black text-opacity-80">
            {id ? 'Color Edit' : 'Color'}
          </h1>
          <p className="mt-1 cursor-pointer text-sm font-medium text-black text-opacity-50 underline">
            {'> dashboard > color'}
          </p>
        </div>
        <div className="mb-4 w-full p-3">
          {id ? <ColorEdit id={id} edit={edit} /> : <ColorList />}
        </div>
      </div>
    </>
  );
}

export default Color;
