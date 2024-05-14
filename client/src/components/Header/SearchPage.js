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
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..."
            type="search"
            value={searchQuery}
            name="search"
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
