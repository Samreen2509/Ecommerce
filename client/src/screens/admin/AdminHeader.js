import React from 'react';
import { Link } from 'react-router-dom';

function AdminHeader() {
  return (
    <div className="flex h-14 items-center justify-start gap-x-7 bg-blue-500 px-10 text-xl text-white">
      <Link to="/admin/dashboard/product">Products</Link>
      <Link to="/admin/dashboard/user">Users</Link>
      <Link to="/">Home</Link>
    </div>
  );
}

export default AdminHeader;
