import img from '../../../images/favicon.png';
import { FaSquareInstagram, FaSquareXTwitter } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';

const Footer = () => {
  const firstCol = [
    { name: 'Home', link: '/' },
    { name: 'Collections', link: '/collections' },
    { name: 'Products', link: '/products' },
    { name: 'Category', link: '/category' },
  ];
  const secondCol = [
    { name: 'Profile', link: '/profile' },
    { name: 'Login', link: '/login' },
    { name: 'Register', link: '/register' },
    { name: 'Wishlist', link: '/wishlist' },
    { name: 'Bag', link: '/bag' },
  ];

  return (
    <footer>
      <div className="grid gap-8 border-t-2 px-4 py-8 sm:h-[400px] sm:grid-cols-5 sm:px-20">
        <div className="flex flex-col items-start justify-start sm:col-span-2">
          <div className="flex items-center space-x-1 text-[#B91708]">
            <img src={img} className="h-24 object-cover" />
          </div>
          <p className="mt-2 text-xl">
            Reach us Monday {'-'} Friday from 9 am to 6 pm
          </p>
          <p className="text-sm">+91 9412341234</p>
          <div className="mt-4 flex gap-x-4 sm:mt-6">
            <FaSquareInstagram className="cursor-pointer text-4xl text-primary" />
            <FaFacebookSquare className="cursor-pointer text-4xl text-primary" />
            <FaSquareXTwitter className="cursor-pointer text-4xl text-primary" />
          </div>
        </div>
        <div>
          <h2 className="font-bold">LINKS</h2>
          <div className="mt-4 flex flex-col gap-y-3 sm:mt-12">
            {firstCol.map((item, index) => (
              <a
                key={index}
                className="transition duration-150 hover:font-bold hover:text-primary"
                href={item.link}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="">
          <h2 className="font-bold">HELP</h2>
          <div className="mt-4 flex flex-col gap-y-3 sm:mt-12">
            {secondCol.map((item, index) => (
              <a
                className="transition duration-150 hover:font-bold hover:text-primary"
                key={index}
                href={item.link}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-bold">NEWSLETTER</h2>
          <div className="mt-4 flex items-center justify-center sm:mt-12">
            <div className="grid w-full max-w-xs gap-4">
              <input
                type="text"
                className="h-10 w-full rounded-md border bg-white p-2 text-sm"
                placeholder="Enter your email"
              />
              <button className="rounded-md bg-primary py-2 text-gray-50 transition duration-300 ease-in-out hover:bg-primary-light">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-9 w-full items-center justify-center bg-black text-white">
        <h2>&copy; Copyright 2024 | Ecommerce</h2>
      </div>
    </footer>
  );
};

export default Footer;
