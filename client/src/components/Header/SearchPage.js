import React, { useEffect, useState } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchPage({ handleSearchLeave }) {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleQuerySearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/search/p/${limit}`,
        {
          params: { q: query },
        }
      );
      setResult(response.data.data.searchInfo);
      const productId = response.data.data.searchInfo[0]._id;
      navigate(`/singleProduct/${productId}`);
      handleSearchLeave();
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASEURL}/search/p/${limit}`,
          {
            params: { q: query },
          }
        );
        setResult(response.data.data.searchInfo);
        setError('');
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
      }
    };
    handleSearch();
  }, [query]);

  return (
    <div className="absolute left-0 top-0 z-50 flex h-[35%] w-full flex-col items-center bg-white">
      <div className="flex min-h-full w-full flex-col items-center justify-center bg-gray-100">
        <div className="mx-10 flex w-full rounded-t-2xl  bg-white shadow-lg">
          <input
            className="block w-full rounded-t-2xl border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            placeholder="Search for anything..."
            type="search"
            value={query}
            name="search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleQuerySearch}
            className="m-2 rounded-full bg-orange-400 p-2 text-white"
          >
            <IoSearch className="h-6 w-6" />
          </button>
        </div>
        {result && result.length > 0 && (
          <div className="mx-10 flex w-full rounded-b-2xl bg-white shadow-lg">
            <div className="flex w-full cursor-pointer flex-col px-5">
              {result &&
                result.map((product) => (
                  <span
                    key={product._id}
                    onClick={() => setQuery(product.name)}
                  >
                    {product.name}
                  </span>
                ))}
            </div>
          </div>
        )}
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
