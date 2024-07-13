import React, { useEffect, useState } from 'react';
import logo from '../../../images/favicon.png';
import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { FiMenu } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import DropDown from './DropDown';
import SearchPage from './SearchPage';
import { useSelector } from 'react-redux';

function Header() {
  const [Sidemenu, setSidemenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalWish, setTotalWish] = useState(0);
  const [totalBag, setTotalBag] = useState(0);

  const { productTotalQty, isLoading } = useSelector((state) => state.cart);
  const { totalWishProducts, isLoading: loadingwishlistitems } = useSelector(
    (state) => state.wishlist
  );
  const {
    isUserLogin,
    userInfo,
    isLoading: isLoadingLogout,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    setTotalWish(totalWishProducts);
    setTotalBag(productTotalQty);
  }, [totalWishProducts, productTotalQty]);

  useEffect(() => {
    if (!isUserLogin) {
      setTotalBag(0);
      setTotalWish(0);
    }
  }, [isUserLogin]);

  const handleHover = () => {
    setIsDropdownOpen(true);
  };

  const handleLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleSearchClick = () => {
    setOpenSearch(true);
  };
  const handleSearchLeave = () => {
    setOpenSearch(false);
  };

  const navtext = [
    { text: 'Home', link: '/' },
    { text: 'Collections', link: '/collections' },
    { text: 'Products', link: '/products' },
    { text: 'Category', link: '/category' },
  ];
  const MobileNavtext = [
    { text: 'Home', link: '/' },
    { text: 'Collections', link: '/collections' },
    { text: 'Products', link: '/products' },
    { text: 'Category', link: '/category' },
    { text: 'Login', link: '/login' },
    { text: 'Register', link: '/register' },
  ];

  return (
    <>
      {/* <Sidemenu /> */}
      <div className="fixed z-50 flex h-20 w-full items-center gap-x-11 border-b bg-white px-10 text-black sm:justify-between sm:px-2 md:justify-between md:px-5 lg:justify-start">
        <div className="flex gap-x-5 lg:hidden">
          {Sidemenu ? (
            <RxCross2 size={30} onClick={() => setSidemenu(!Sidemenu)} />
          ) : (
            <FiMenu size={30} onClick={() => setSidemenu(!Sidemenu)} />
          )}
        </div>
        {Sidemenu && (
          <div className="absolute left-0 top-20 z-40 flex h-[100vh] w-full flex-col items-start gap-x-10 gap-y-10 bg-white p-4 pt-10 font-semibold lg:hidden ">
            {MobileNavtext.map((item, index) => {
              if (
                isUserLogin &&
                (item.text === 'Login' || item.text === 'Register')
              ) {
                return null;
              }

              return (
                <div
                  key={index}
                  className="h-10 w-full border-b text-start hover:bg-gray-300 hover:text-primary"
                >
                  <Link to={item.link} className="capitalize">
                    {item.text}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        <Link to="/">
          <img src={logo} alt="logo" className="h-16 object-contain" />
        </Link>
        <div className="hidden justify-evenly gap-x-8 font-semibold lg:flex">
          {navtext.map((item, index) => (
            <div key={index} className="hover:text-primary">
              <Link to={item.link} className="capitalize">
                {item.text}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Only Cart */}
        <div className="flex justify-end gap-x-8 font-semibold lg:hidden">
          <div className="flex cursor-pointer items-center justify-between gap-x-4 hover:text-primary">
            <Link
              to={'/bag'}
              className="relative flex w-10 items-center justify-center "
            >
              <FiShoppingBag size={30} />
              <div className="absolute right-[2] top-[-5] h-4 w-4 rounded-full bg-black text-center text-white">
                {isLoading ? (
                  <p className="animate-spin text-[12px] font-semibold">0</p>
                ) : (
                  <p className="text-[12px] font-semibold">{totalBag || 0}</p>
                )}
              </div>
            </Link>
          </div>
          <IoIosSearch
            className="lg:hidden"
            onClick={handleSearchClick}
            size={30}
          />
        </div>

        <div className="hidden h-11 flex-1 justify-end gap-x-8 font-semibold lg:flex">
          {/* Search part */}
          <SearchPage handleSearchLeave={handleSearchLeave} />

          {/* Wishlist part */}
          <Link
            to={'/wishlist'}
            className="flex h-full cursor-pointer flex-col items-center justify-between hover:text-primary"
          >
            <div className="relative flex w-10 items-center justify-center">
              <div>
                <FaRegHeart size={22} />
                <div className="absolute right-[-1] top-[-5] h-4 w-4 rounded-full bg-black text-center text-white">
                  {loadingwishlistitems ? (
                    <p className="animate-spin text-[12px] font-semibold">0</p>
                  ) : (
                    <p className="text-[12px] font-semibold">
                      {totalWish || 0}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm font-normal">Wishlist</p>
          </Link>

          {/* Bag part */}
          <Link
            to={'/bag'}
            className="flex h-full cursor-pointer flex-col items-center justify-between hover:text-primary"
          >
            <div className="relative flex w-10 items-center justify-center ">
              <div>
                <FiShoppingBag size={22} />
                <div className="absolute right-[4] top-[-5] h-4 w-4 rounded-full bg-black text-center text-white">
                  {isLoading ? (
                    <p className="animate-spin text-[12px] font-semibold">0</p>
                  ) : (
                    <p className="text-[12px] font-semibold">{totalBag || 0}</p>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm font-normal">Bag</p>
          </Link>

          {/* Account part */}
          <div className="flex h-full cursor-pointer items-center justify-center">
            <div
              className={`flex h-full cursor-pointer flex-col items-center justify-between hover:text-primary ${isDropdownOpen && 'text-primary'}`}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              <VscAccount size={22} />
              <p className="text-sm font-normal">Account</p>
            </div>
            {isDropdownOpen && (
              <DropDown
                handleLeave={handleLeave}
                handleHover={handleHover}
                userInfo={userInfo}
                isUserLogin={isUserLogin}
                isLoadingLogout={isLoadingLogout}
              />
            )}
          </div>
        </div>
      </div>
      {openSearch && (
        <SearchPage handleSearchLeave={handleSearchLeave} mobile="true" />
      )}
    </>
  );
}

export default Header;
