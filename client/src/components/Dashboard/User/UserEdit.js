import React from 'react';
import UserEditDetails from './UserEditDetails';

function UserEdit({ id, edit }) {
  return (
    <>
      <UserEditDetails id={id} edit={edit} />
    </>
  );
}

export default UserEdit;
