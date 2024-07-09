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
      className="flex justify-center rounded-md border border-opacity-40 bg-white px-2 py-2 transition duration-300 hover:border-transparent hover:shadow-md hover:shadow-black"
    >
      <Link to={`/singleProduct/${_id}`} className="link flex flex-col">
        <div className="relative">
          <img
            className="h-72 w-60 rounded-md"
            alt="cardImg"
            loading="true"
            src={mainImage?.url}
          />
          <div className={`${isHovered ? 'block' : 'hidden'}`}>
            <WishlistBtn id={_id} isUserLogin={isUserLogin} />
          </div>
        </div>
        <div className="mt-2 flex w-full flex-col items-center justify-center px-2">
          <h1 className="w-full text-start text-base font-medium text-opacity-85">
            {name}
          </h1>
          <p className="w-full text-start text-base font-normal text-opacity-80">
            {description.substring(0, 30)}..
          </p>
          <p className="flex w-full items-end justify-start text-start text-base font-semibold text-red-800">
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
