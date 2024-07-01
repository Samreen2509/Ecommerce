import React from 'react';
import ProductEditOtherImages from './ProductEditOtherImages';
import ProductEditDetails from './ProductEditDetails';

function ProductEdit({ id, edit, otherImages }) {
  return (
    <>
      {id && edit && otherImages && otherImages === 'true' && (
        <ProductEditOtherImages id={id} edit={edit} otherImages={otherImages} />
      )}

      {id && edit && !otherImages && <ProductEditDetails id={id} edit={edit} />}
    </>
  );
}

export default ProductEdit;
