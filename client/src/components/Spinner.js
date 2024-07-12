import React from 'react';
import { FiLoader } from 'react-icons/fi';

function Spinner() {
  return (
    <div className="mt-10 flex items-center justify-center">
      <FiLoader className="mr-2 h-5 w-5 animate-spin" size={24} />
    </div>
  );
}

export default Spinner;
