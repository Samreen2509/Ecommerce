import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
  console.log(currentPage, totalPages);

  return (
    <ol className="flex w-full justify-center space-x-1 p-2 text-xs font-medium">
      <li>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex h-8 w-8 cursor-pointer  items-center justify-center rounded border border-gray-100"
        >
          <IoIosArrowBack className="h-3 w-3" />
        </button>
      </li>

      {[...Array(totalPages)].map((_, index) => (
        <li key={index}>
          <button
            onClick={() => handlePageChange(index + 1)}
            className={`block h-8 w-8 rounded border border-gray-100 text-center leading-8 ${
              currentPage === index + 1
                ? 'border-blue-600 bg-blue-600 text-white'
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
          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-100"
        >
          <IoIosArrowForward className="h-3 w-3" />
        </button>
      </li>
    </ol>
  );
};

export default Pagination;
