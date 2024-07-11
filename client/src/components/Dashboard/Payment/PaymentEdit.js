import React from 'react';
import PaymentEditDetails from './PaymentEditDetails';

function PaymentEdit({ id, edit }) {
  return (
    <>
      <PaymentEditDetails id={id} edit={edit} />
    </>
  );
}

export default PaymentEdit;
