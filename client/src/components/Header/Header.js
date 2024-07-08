import React, { useState } from 'react';
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
  const { productTotalQty, isLoading } = useSelector((state) => state.cart);
  const { totalWishProducts: wishlistitems, isLoading: loadingwishlistitems } =
    useSelector((state) => state.wishlist);
  const { isUserLogin, userInfo } = useSelector((state) => state.auth);

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
    { text: 'Blog', link: '/blog' },
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
            {MobileNavtext.map((item, index) => (
              <div
                key={index}
                className="h-10 w-full border-b text-start hover:bg-gray-300 hover:text-red-400"
              >
                <Link to={item.link} className="capitalize">
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        )}
        <Link to="/">
          <img src={logo} alt="logo" className="h-16 object-contain" />
        </Link>
        <div className="hidden justify-evenly gap-x-8 font-semibold lg:flex">
          {navtext.map((item, index) => (
            <div key={index} className="hover:text-red-400">
              <Link to={item.link} className="capitalize">
                {item.text}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Only Cart */}
        <div className="flex justify-end gap-x-8 font-semibold lg:hidden">
          <div className="flex cursor-pointer items-center justify-between gap-x-4 hover:text-orange-400">
            <Link
              to={'/bag'}
              className="relative flex w-10 items-center justify-center "
            >
              <FiShoppingBag size={30} />
              <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-black text-center text-white">
                {isLoading ? (
                  <p className="animate-spin text-[12px] font-semibold">0</p>
                ) : (
                  <p className="text-[12px] font-semibold">
                    {productTotalQty || 0}
                  </p>
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

        <div className="hidden flex-1 justify-end gap-x-8 font-semibold lg:flex">
          {/* Search part */}
          <SearchPage handleSearchLeave={handleSearchLeave} />

          {/* Wishlist part */}
          <Link
            to={'/wishlist'}
            className="flex cursor-pointer flex-col items-center justify-between gap-x-4 hover:text-orange-400"
          >
            <div className="relative flex w-10 items-center justify-center ">
              <div>
                <FaRegHeart size={22} />
                <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-black text-center text-white">
                  {loadingwishlistitems ? (
                    <p className="animate-spin text-[12px] font-semibold">0</p>
                  ) : (
                    <p className="text-[12px] font-semibold">{wishlistitems}</p>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm font-normal">Wishlist</p>
          </Link>

          {/* Bag part */}
          <Link
            to={'/bag'}
            className="flex cursor-pointer flex-col items-center justify-between gap-x-4 hover:text-orange-400"
          >
            <div className="relative flex w-10 items-center justify-center ">
              <div>
                <FiShoppingBag size={22} />
                <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-black text-center text-white">
                  {isLoading ? (
                    <p className="animate-spin text-[12px] font-semibold">0</p>
                  ) : (
                    <p className="text-[12px] font-semibold">
                      {productTotalQty || 0}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm font-normal">Bag</p>
          </Link>

          {/* Account part */}
          <div className="flex cursor-pointer items-center justify-between gap-x-4">
            <div
              className={`flex cursor-pointer flex-col items-center justify-between gap-x-4 hover:text-orange-400 ${isDropdownOpen && 'text-orange-400'}`}
              onMouseEnter={handleHover}
            >
              <VscAccount size={22} />
              <p className="text-sm font-normal">Account</p>
            </div>
            {isDropdownOpen && (
              <DropDown
                handleLeave={handleLeave}
                userInfo={userInfo}
                isUserLogin={isUserLogin}
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
