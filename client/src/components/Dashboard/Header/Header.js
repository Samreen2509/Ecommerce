import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../images/favicon.png';
import HeaderProfileBtn from './HeaderProfileBtn';
import { useSelector } from 'react-redux';

function Header() {
  const { isUserLogin, userInfo } = useSelector((state) => state.auth);
  const navtext = [
    { text: 'Home', link: '/' },
    { text: 'Update', link: './update' },
    { text: 'Help', link: './help' },
  ];

  return (
    <>
      <div className="text-md flex h-14 items-center justify-between gap-x-7 border-b px-10">
        <Link to="/">
          <img src={logo} alt="logo" className="h-14" />
        </Link>
        <div className="flex items-center justify-center">
          <nav className="mx-4">
            {navtext.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.link}
                  className="font-base mx-3 text-base hover:text-opacity-60 hover:underline"
                >
                  {item.text}
                </Link>
              );
            })}
          </nav>
          <HeaderProfileBtn username={userInfo.username} />
        </div>
      </div>
    </>
  );
}

export default Header;
