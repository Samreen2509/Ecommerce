import React from 'react';
import ProductList from '../../components/Dashboard/Product/ProductList';
import ProductEdit from '../../components/Dashboard/Product/ProductEdit';
import { useLocation } from 'react-router-dom';

function Product() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const edit = searchParams.get('edit');
  const otherImages = searchParams.get('otherimages');

  return (
    <>
      <div className="h-screen w-full ">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-black text-opacity-80">
            {id ? 'Product Edit' : 'Product'}
          </h1>
          <p className="mt-1 cursor-pointer text-sm font-medium text-black text-opacity-50 underline">
            {'> dashboard > product'}
          </p>
        </div>
        <div className="mb-4 w-full p-3">
          {id ? (
            <ProductEdit id={id} edit={edit} otherImages={otherImages} />
          ) : (
            <ProductList />
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
