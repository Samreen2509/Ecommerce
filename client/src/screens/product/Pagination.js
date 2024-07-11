import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

const Pagination = ({ currentPage, totalPages, onPageChange, style }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  if (totalPages === 0) return null;
  return (
    <ol
      className={`flex ${style?.position ? style.position : 'justify-center'} w-full space-x-1 p-2 text-xs font-medium`}
    >
      <li>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex h-10 w-10 cursor-pointer  items-center justify-center rounded border border-gray-200"
        >
          <IoIosArrowBack className="h-3 w-3" />
        </button>
      </li>

      {[...Array(totalPages)].map((_, index) => (
        <li key={index}>
          <button
            onClick={() => handlePageChange(index + 1)}
            className={`block h-10 w-10 rounded border border-gray-200 text-center leading-8 ${
              currentPage === index + 1
                ? `border-blue-600 ${style?.color ? style.color : 'bg-blue-600'} text-white`
                : ''
            }`}
          >
            {index + 1}
          </button>
        </li>
      ))}

      <li>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-gray-200"
        >
          <IoIosArrowForward className="h-3 w-3" />
        </button>
      </li>
    </ol>
  );
};

export default Pagination;
