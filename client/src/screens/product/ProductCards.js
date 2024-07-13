import { Link } from 'react-router-dom';
import WishlistBtn from '../BAG/WishlistBtn';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ProductCard = ({ sdata }) => {
  const { mainImage, name, description, price, _id } = sdata;
  const { isUserLogin } = useSelector((state) => state.auth);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex w-64 justify-center rounded-md border border-opacity-40 bg-white px-2 py-1 transition duration-300 hover:border-transparent hover:shadow-md hover:shadow-black md:py-2 lg:py-2"
    >
      <Link to={`/singleProduct/${_id}`} className="flex flex-col">
        <div className="relative">
          <img
            className="aspect-auto h-72 w-60 rounded-md"
            alt="cardImg"
            loading="true"
            src={mainImage?.url}
          />
          {window.innerWidth < 913 ? (
            <WishlistBtn id={_id} isUserLogin={isUserLogin} />
          ) : (
            <div className={`${isHovered ? 'block' : 'hidden'}`}>
              <WishlistBtn id={_id} isUserLogin={isUserLogin} />
            </div>
          )}
        </div>
        <div className="mt-2 flex w-full flex-col items-center justify-center px-2">
          <h1 className="w-full text-start text-sm font-medium text-opacity-85 md:text-base lg:text-base">
            {name.substring(0, 20)}..
          </h1>
          <p className="w-full text-start text-base font-normal text-opacity-80">
            {description.substring(0, 20)}...
          </p>
          <p className="flex w-full items-end justify-start text-start  text-sm font-semibold text-red-800 md:text-base lg:text-base">
            Rs. {price}
            <span className="ml-2 text-sm font-normal text-yellow-800 text-opacity-60 line-through">
              Rs .{price + 278}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
