import { Link } from 'react-router-dom';
import AddToCart from '../BAG/AddToCart';
import { SiGooglelens } from 'react-icons/si';
import AddToWishlistBtn from '../BAG/AddToWishlistBtn';

const ProductCard = (props) => {
  const { sdata } = props;
  const { mainImage, description, price, _id } = sdata;
  const quantity = 1;
  console.log(props);
  return (
    <div className="group m-10 mb-24 flex h-96 w-72 flex-wrap justify-center  rounded-md ">
      <div id="one" className="items-center duration-700 hover:scale-110">
        <div className=" relative flex flex-col ">
          {/* Wishlist Btn */}
          <AddToWishlistBtn id={_id} />
          <div className="relative right-11 top-28 float-left ml-3 flex h-11 w-11  flex-col items-center justify-center rounded-full opacity-0 transition-all duration-500 hover:bg-black group-hover:right-0  group-hover:opacity-100">
            <SiGooglelens className="absolute z-50 h-6 w-9 text-black transition-all duration-300 hover:text-white" />
          </div>
        </div>
        <Link to={`/singleProduct/${_id}`} className="link">
          <img
            className="h-96 w-72 object-contain hover:border-2 hover:border-solid hover:border-gray-600"
            alt="cardImg"
            loading="true"
            src={mainImage.url}
          />
        </Link>

        <AddToCart id={_id} quantity={quantity} />
      </div>

      <div>
        <div className="relative bottom-20 right-8 m-auto">
          <h3 className="w-64">
            {description} - {price}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
