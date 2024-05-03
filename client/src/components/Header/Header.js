'use client';
import React, { useState } from 'react';
import logo from '../../../images/favicon.png';
import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { FiMenu } from 'react-icons/fi';
import Sidemenu from './Sidemenu';

function Header() {
  const [Sidemenu, setSidemenu] = useState(false);
  const navtext = ['Home', 'Collections', 'Products', 'Other pages', 'Blog'];
  const cartItems = 0;
  const wishlistitems = 0;

  return (
    <>
      {Sidemenu ? <Sidemenu /> : ''}
      <div className="flex h-[80px] items-center justify-between border-b bg-white px-5 text-black lg:h-[100px]">
        <div className="flex gap-x-5 lg:hidden">
          <FiMenu size={30} />
          <IoIosSearch size={30} />
        </div>
        <div className="hidden gap-x-8 font-semibold lg:flex">
          {navtext.map((item, index) => (
            <div key={index} className="hover:text-red-400">
              <Link key={index}>{item}</Link>
            </div>
          ))}
        </div>
        <div>
          <img src={logo} alt="logo" className="h-14 lg:h-20" />
        </div>

        {/* Mobile Only Cart */}
        <div className="flex justify-evenly gap-x-8 font-semibold lg:hidden">
          <div className="flex cursor-pointer items-center justify-between gap-x-4 hover:text-orange-400">
            <div className="relative flex h-10 w-10 items-center justify-center ">
              <FiShoppingBag size={30} />
              <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-black text-center text-white">
                <div className="text-[12px] font-semibold">
                  <Link to={'/bag'}>{cartItems}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden justify-evenly gap-x-8 font-semibold lg:flex">
          <div className="flex cursor-pointer items-center justify-between gap-x-4 hover:text-orange-400">
            <IoIosSearch size={22} />
            <p>Search</p>
          </div>
          <div className="flex cursor-pointer items-center justify-between gap-x-4 hover:text-orange-400">
            <VscAccount size={22} />
            <p>Account</p>
          </div>
          <div className="flex cursor-pointer items-center justify-between gap-x-4 hover:text-orange-400">
            <Link
              to={'/wishlist'}
              className="relative flex h-10 w-10 items-center justify-center "
            >
              <div>
                <FaRegHeart size={22} />
                <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-black text-center text-white">
                  <p className="text-[12px] font-semibold">{wishlistitems}</p>
                </div>
              </div>
            </Link>
            <p>Wishlist</p>
          </div>
          <div className="flex cursor-pointer items-center justify-between gap-x-4 hover:text-orange-400">
            <Link
              Link
              to={'/bag'}
              className="relative flex h-10 w-10 items-center justify-center "
            >
              <div>
                <FiShoppingBag size={22} />
                <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-black text-center text-white">
                  <p className="text-[12px] font-semibold">{cartItems}</p>
                </div>
              </div>
            </Link>
            <p>Bag</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
