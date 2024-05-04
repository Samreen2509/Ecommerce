import React, { useState } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function SearchPage({ handleSearchLeave }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    handleSearchLeave();
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className="absolute left-0 top-0 z-30 flex h-[35%] w-full flex-col items-center bg-white">
      <div className="flex min-h-full w-full items-center justify-center bg-gray-100">
        <div className="mx-10 flex w-full rounded-2xl bg-white shadow-lg">
          <input
            className="w-full border-none bg-transparent px-4 py-1 text-xl text-gray-500 outline-none focus:outline-none"
            type="search"
            value={searchQuery}
            name="search"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="m-2 rounded-full bg-orange-400 p-2 text-white"
          >
            <IoSearch className="h-6 w-6" />
          </button>
        </div>
      </div>
      <button
        className="mt-3 flex h-20 w-20 items-center justify-center"
        onClick={handleSearchLeave}
      >
        <CiCircleRemove size={40} />
      </button>
    </div>
  );
}

export default SearchPage;
