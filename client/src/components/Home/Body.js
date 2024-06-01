import Shimmer from '../Loading/Shimmer.js';
import { useEffect, useState } from 'react';
import Carousel from './Carousel';
import CategoryCard from '../../screens/category/CategoryCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../features/categorySlice.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useCheckSession from '../../hook/useCheckSession.js';
import { getCartProducts } from '../../features/cartSlice.js';

const Body = () => {
  const { categories, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const { isUserVerified, refreshToken } = useSelector((state) => state.auth);
  const [storeSection, setStoreSection] = useState([]);

  useCheckSession();

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getCartProducts());
  }, [dispatch]);
  console.log(categories);

  if (loading) {
    return <Shimmer />;
  }
  return (
    <div className="body">
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
        <div className="min-h-min">
          <div className="mx-48 my-8 text-5xl font-bold">
            <h1>Shop by category</h1>
          </div>
          <div className="flex flex-wrap justify-center">
            {categories &&
              categories?.data?.map((category) => (
                <Link
                  to={`/category/${category._id}`}
                  key={category._id}
                  className="link"
                >
                  <CategoryCard sdata={category} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
