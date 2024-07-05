import React from 'react';
import UserList from '../../components/Dashboard/User/UserList';
import UserEdit from '../../components/Dashboard/User/UserEdit';
import { useLocation } from 'react-router-dom';

function User() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const edit = searchParams.get('edit');

  return (
    <>
      <div className="h-screen w-full ">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-black text-opacity-80">
            {id ? 'User Edit' : 'User'}
          </h1>
          <p className="mt-1 cursor-pointer text-sm font-medium text-black text-opacity-50 underline">
            {'> dashboard > user'}
          </p>
        </div>
        <div className="mb-4 w-full p-3">
          {id ? <UserEdit id={id} edit={edit} /> : <UserList />}
        </div>
      </div>
    </>
  );
}

export default User;
