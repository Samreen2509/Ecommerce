import React from 'react';
import CategoryEditDetails from './CategoryEditDetails';

function CategoryEdit({ id, edit }) {
  return <>{id && edit && <CategoryEditDetails id={id} edit={edit} />}</>;
}

export default CategoryEdit;
