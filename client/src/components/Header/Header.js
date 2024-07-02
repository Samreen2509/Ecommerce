import React, { useState } from 'react';
import logo from '../../../images/favicon.png';
import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { VscAccount, VscLoading } from 'react-icons/vsc';
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
  const userdata = useSelector((state) => state.auth);

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
    { text: 'Blog', link: '/blog' },
    { text: 'Login', link: '/login' },
    { text: 'Register', link: '/register' },
  ];

  return (
    <>
      {/* <Sidemenu /> */}
      <div className="flex h-[80px] items-center justify-between border-b bg-white px-5 text-black lg:h-[100px]">
        <div className="flex gap-x-5 lg:hidden">
          {Sidemenu ? (
            <RxCross2 size={30} onClick={() => setSidemenu(!Sidemenu)} />
          ) : (
            <FiMenu size={30} onClick={() => setSidemenu(!Sidemenu)} />
          )}
          <IoIosSearch onClick={handleSearchClick} size={30} />
          {openSearch && <SearchPage handleSearchLeave={handleSearchLeave} />}
        </div>
        {Sidemenu && (
          <>
            <div className="absolute left-0 top-[10%] z-20 flex h-[400px] w-full flex-col items-center gap-x-8 gap-y-8 bg-white p-4 font-semibold lg:hidden ">
              {MobileNavtext.map((item, index) => (
                <div
                  key={index}
                  className="w-full text-center hover:bg-gray-300 hover:text-red-400"
                >
                  <Link to={item.link} className="capitalize">
                    {item.text}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="hidden justify-evenly gap-x-8 font-semibold lg:flex">
          {navtext.map((item, index) => (
            <div key={index} className="hover:text-red-400">
              <Link to={item.link} className="capitalize">
                {item.text}
              </Link>
            </div>
          ))}
        </div>
        <Link to="/">
          <img src={logo} alt="logo" className="h-14 lg:h-20" />
        </Link>

        {/* Mobile Only Cart */}
        <div className="flex justify-evenly gap-x-8 font-semibold lg:hidden">
          <div className="flex cursor-pointer items-center justify-between gap-x-4 hover:text-orange-400">
            <Link
              to={'/bag'}
              className="relative flex h-10 w-10 items-center justify-center "
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
        </div>

        <div className="hidden justify-evenly gap-x-8 font-semibold lg:flex">
          {/* Search part */}

          <div
            onClick={handleSearchClick}
            className="flex cursor-pointer items-center justify-between gap-x-4 hover:text-orange-400"
          >
            <IoIosSearch size={22} />
            <p>Search</p>
          </div>
          {openSearch && <SearchPage handleSearchLeave={handleSearchLeave} />}

          {/* Wishlist part */}
          <Link
            to={'/wishlist'}
            className="flex cursor-pointer items-center justify-between gap-x-4 hover:text-orange-400"
          >
            <div className="relative flex h-10 w-10 items-center justify-center ">
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
            <p>Wishlist</p>
          </Link>

          {/* Bag part */}
          <Link
            to={'/bag'}
            className="flex cursor-pointer items-center justify-between gap-x-4 hover:text-orange-400"
          >
            <div className="relative flex h-10 w-10 items-center justify-center ">
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
            <p>Bag</p>
          </Link>
          {/* Account part */}
          <div className="flex cursor-pointer items-center justify-between gap-x-4">
            <div
              className={`flex cursor-pointer items-center justify-between gap-x-4 hover:text-orange-400 ${isDropdownOpen && 'text-orange-400'}`}
              onMouseEnter={handleHover}
            >
              <VscAccount size={22} />
              <p>Account</p>
            </div>
            {isDropdownOpen && <DropDown handleLeave={handleLeave} />}
          </div>
          {userdata?.userInfo?.role === 'ADMIN' && (
            <Link
              to="/admin/dashboard"
              className="flex cursor-pointer items-center justify-between gap-x-4"
            >
              <div className="flex cursor-pointer items-center justify-between gap-x-4  hover:text-orange-400">
                <p>Dashboard</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
