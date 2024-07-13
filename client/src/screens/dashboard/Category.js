import React from 'react';
import CategoryList from '../../components/Dashboard/Category/CategoryList';
import CategoryEdit from '../../components/Dashboard/Category/CategoryEdit';
import { useLocation } from 'react-router-dom';

function Category() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const edit = searchParams.get('edit');

  return (
    <>
      <div className="h-screen w-full ">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-black text-opacity-80">
            {id ? 'Category Edit' : 'Category'}
          </h1>
          <p className="mt-1 cursor-pointer text-sm font-medium text-black text-opacity-50 underline">
            {'> dashboard > category'}
          </p>
        </div>
        <div className="mb-4 w-full p-3">
          {id ? <CategoryEdit id={id} edit={edit} /> : <CategoryList />}
        </div>
      </div>
    </>
  );
}

export default Category;
