import Shimmer from '../Loading/Shimmer.js';
import { useEffect } from 'react';
import Carousel from './Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../features/categorySlice.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useCheckSession from '../../hook/useCheckSession.js';
import { getCartProducts } from '../../features/cartSlice.js';
import CategoryCard from '../../screens/category/CategoryCard.js';
import { getWishListProducts } from '../../features/wishlistSlice.js';
import Button from '../Button.js';
import { useNavigate } from 'react-router-dom';

const Body = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isUserVerified, isUserLogin } = useSelector((state) => state.auth);

  const { wishlistProducts } = useSelector((state) => state.wishlist);

  if (isUserLogin) {
    useCheckSession();
  }

  useEffect(() => {
    if (isUserLogin) {
      if (wishlistProducts.length === 0) {
        dispatch(getWishListProducts());
      }
      dispatch(getCartProducts());
    }
    dispatch(getAllCategory());
  }, [dispatch]);

  return categories.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body mb-20">
      <div>
        <div className="">
          {isUserVerified === false ? (
            <p className="bg-black text-center text-lg text-white">
              <span className="mr-2 cursor-pointer text-slate-300 hover:underline">
                click here
              </span>
              please verify your account. A verification link already sent to
              your email address
            </p>
          ) : (
            ''
          )}
          <Carousel />
        </div>
        <div className="mt-20 flex min-h-min flex-col items-center justify-center">
          <div className="text-4xl font-semibold">
            <h1>Shop by category</h1>
          </div>
          <div className="flex flex-wrap justify-center">
            {categories &&
              categories?.data?.slice(0, 3).map((category) => (
                <Link
                  to={`/category/${category._id}`}
                  key={category._id}
                  className="link"
                >
                  <CategoryCard sdata={category} />
                </Link>
              ))}
          </div>

          <Button
            title="View All"
            bgColor="tranparent"
            textColer="black"
            className="blck text-1xl h-14 w-60 border border-solid duration-500 ease-linear hover:bg-slate-950 hover:text-white"
            onClick={() => navigate('/category')}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
