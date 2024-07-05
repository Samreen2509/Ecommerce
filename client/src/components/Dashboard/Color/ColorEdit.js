import React from 'react';
import ColorEditDetails from './ColorEditDetails';

function ColorEdit({ id, edit, otherImages }) {
  return (
    <>
      {id && edit && !otherImages && <ColorEditDetails id={id} edit={edit} />}
    </>
  );
}

export default ColorEdit;
