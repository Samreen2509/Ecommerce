import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchPage({ handleSearchLeave, mobile }) {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleQuerySearch = async () => {
    if (query.length >= 3) {
      try {
        const response = await axios.get(
          `${process.env.BASEURL}/search/p/${limit}`,
          {
            params: { q: query },
          }
        );
        const searchResult = response.data.data.searchInfo;
        setResult(searchResult);
        if (searchResult.length > 0) {
          const productId = searchResult[0]._id;
          navigate(`/singleProduct/${productId}`);
        }
        setError('');
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (query.length >= 3) {
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
      }
    };
    handleSearch();
  }, [query]);

  const handleClearSearch = () => {
    setQuery('');
    setResult([]);
  };

  const handleResultClick = (productName, productId) => {
    setQuery(productName);
    navigate(`/singleProduct/${productId}`);
  };

  return (
    <>
      {!mobile ? (
        <div>
          <div className="flex">
            <input
              placeholder="Search"
              className="mr-1 h-11 w-80 rounded-bl-md rounded-tl-md border-2 border-gray-300 px-2 outline-none"
              type="search"
              value={query}
              name="search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <div
              onClick={handleQuerySearch}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-br-md rounded-tr-md border-2 border-b-gray-300 hover:bg-gray-200"
            >
              <IoSearch />
            </div>
          </div>
          {result && result.length > 0 && query && (
            <div className="absolute top-[88px] z-50 flex w-[364px] rounded-md bg-white shadow-lg">
              <div className="flex w-full cursor-pointer flex-col py-2">
                {result.map((product) => (
                  <span
                    key={product._id}
                    onClick={() =>
                      handleResultClick(product?.name, product._id)
                    }
                    className="flex h-10 w-full items-center justify-start border-b px-3 py-1 text-start"
                  >
                    {product.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="absolute top-0 z-50 flex h-[100vh] w-[100%] flex-col items-center bg-white">
          <div className="mt-32 flex h-20">
            <input
              placeholder="Search"
              className="mr-1 h-11 w-80 rounded-bl-md rounded-tl-md border-2 border-gray-300 px-2 outline-none"
              type="search"
              value={query}
              name="search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <div
              onClick={query ? handleQuerySearch : handleSearchLeave}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-br-md rounded-tr-md border-2 border-b-gray-300 hover:bg-gray-200"
            >
              {query ? <IoSearch /> : <IoMdClose />}
            </div>
          </div>
          {result && result.length > 0 && query && (
            <div className="z-50 flex w-[364px] rounded-md bg-white shadow-lg">
              <div className="flex w-full cursor-pointer flex-col py-2">
                {result.map((product) => (
                  <span
                    key={product._id}
                    onClick={() => handleResultClick(product.name, product._id)}
                    className="flex h-10 w-full items-center justify-start border-b px-3 py-1 text-start"
                  >
                    {product.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SearchPage;
