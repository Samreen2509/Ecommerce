import Shimmer from '../Loading/Shimmer.js';
import { useEffect } from 'react';
import Carousel from './Carousel.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../features/categorySlice.js';
import { useSelector } from 'react-redux';
import useCheckSession from '../../hook/useCheckSession.js';
import { getCartProducts } from '../../features/cartSlice.js';
import CategoryCard from '../../screens/category/CategoryCard.js';
import { getWishListProducts } from '../../features/wishlistSlice.js';
import Button from '../Button.js';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../screens/product/ProductCards.js';
import { getAllProducts } from '../../features/productSlice.js';
import img1 from '../../../images/truck.webp';
import img2 from '../../../images/ruppe.webp';
import img3 from '../../../images/box.png';
import img4 from '../../../images/clothBanner3.avif';
import img5 from '../../../images/clothBanner4.avif';
import img6 from '../../../images/banner1.jpg';
import img7 from '../../../images/banner2.jpg';
import img8 from '../../../images/banner3.jpg';
import { refreshToken } from '../../features/authSlice.js';

const Body = () => {
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slidesImg = [
    { img: img6, Category: 'New Arrival', text: 'MEN CLOTHS', href: '#' },
    { img: img7, Category: 'New Arrival', text: 'AUTOMAN OVER ', href: '#' },
    { img: img8, Category: 'New Arrival', text: 'MEN GLASSER', href: '#' },
  ];
  const slidesText = [
    {
      textData:
        "Best purchase I’ve made this winter! The color and knitting are exquisite and it's so comfy! Went from NYC to Miami without ever taking it off. Super cute!!",
    },
    {
      textData:
        "This winter’s best purchase! The color and knitting are exquisite, and it's incredibly comfy! Traveled from NYC to Miami without ever taking it off. Super cute!",
    },
    {
      textData:
        "My top winter buy! The color and knitting are exquisite, and it's unbelievably comfy! Went from NYC to Miami without taking it off once. Absolutely adorable!!",
    },
  ];

  const { isUserVerified, isUserLogin } = useSelector((state) => state.auth);

  const { wishlistProducts } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (isUserLogin) {
      if (wishlistProducts.length === 0) {
        dispatch(getWishListProducts());
      }
      dispatch(getCartProducts());
    }
    dispatch(getAllCategory());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isUserLogin) {
      dispatch(refreshToken());
    }
  }, [isUserLogin]);

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
          <Carousel slides={slidesImg} />
        </div>

        {/* Category Section */}
        <div className="mt-20 flex min-h-min flex-col items-center justify-center">
          <div className=" text-1xl font-semibold md:text-3xl lg:text-4xl">
            <h1>Shop by category</h1>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-10 lg:mt-14">
            {categories &&
              categories?.data?.categoryInfo
                ?.slice(0, window.innerWidth < 913 ? 2 : 4)
                .map((category, index) => (
                  <CategoryCard key={index} sdata={category} />
                ))}
          </div>

          <Button
            title="View All"
            bgColor="transparent"
            textColer="black"
            className="tex-sm mt-5 h-11 w-32 border border-gray-300 duration-500 ease-linear hover:bg-orange-600 hover:text-white md:mt-10 md:w-48 md:text-base lg:mt-10 lg:w-48 lg:text-base"
            onClick={() => navigate('/category')}
          />
        </div>

        {/* Product Section */}
        <div className="mt-20 flex w-full flex-col items-center justify-evenly md:mt-36 lg:mt-36">
          <div className="text-1xl font-bold md:text-2xl lg:text-4xl">
            New Arrival{' '}
          </div>
          <div className="mt-5 flex w-full flex-wrap items-center justify-center md:mt-14 md:gap-x-10 lg:mt-14 lg:gap-x-10">
            {products &&
              products.data?.productInfo
                .slice(0, 4)
                .map((product, index) => (
                  <ProductCard key={index} sdata={product} />
                ))}
          </div>

          <Button
            title="View All"
            bgColor="tranparent"
            textColer="black"
            className="ml-2 mr-9 mt-5 h-11 w-32 border border-gray-300 text-sm duration-500 ease-linear hover:bg-orange-600 hover:text-white md:mt-10 md:w-48 md:text-base lg:mt-10 lg:w-48 lg:text-base"
            onClick={() => navigate('/products')}
          />
        </div>

        {/* Details */}
        <div className="mt-28 flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-10 px-20">
          <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-1/3">
            <img src={img1} alt="img" className="h-8 w-10 object-contain" />
            <p className="text-xs">
              <strong>FREE SHIPPING : </strong>All orders of 499/- or more of
              eligible items across any product category qualify.
            </p>
          </div>
          <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-1/3">
            <img src={img2} alt="img" className="h-8 w-10 object-contain" />
            <p className="text-xs">
              <strong>CREDIT CARDS : </strong> We accept Visa, American Express,
              Mastercard, and Discover.
            </p>
          </div>
          <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-1/3">
            <img src={img3} alt="img" className="h-8 w-10 object-contain" />
            <p className="text-xs">
              <strong>RETURN POLICY : </strong>You can return your online order
              within 30 days of receiving your order.
            </p>
          </div>
        </div>

        {/* Banner */}
        <div className="mt-28">
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold">Shop The Look</span>
            <span className="text-base">Trending Outfits Men</span>
          </div>

          <div className="mt-24 flex h-auto w-full items-center justify-center gap-5 md:gap-10 lg:gap-10">
            <div className="h-auto w-auto rounded-md border border-opacity-40 p-2 transition duration-300 hover:border-transparent hover:shadow-md hover:shadow-black">
              <img
                src={img4}
                alt="Cloth"
                className="h-96 w-full rounded-md object-contain"
              />
            </div>
            <div className="h-auto w-auto rounded-md border border-opacity-40 p-2 transition duration-300 hover:border-transparent hover:shadow-md hover:shadow-black">
              <img
                src={img5}
                alt="Cloth"
                className="h-96 w-full rounded-md object-contain"
              />
            </div>
          </div>
        </div>

        {/* TESTIMONIAL */}
        <div className="m-auto mb-40 mt-24 w-4/5 md:w-3/5 lg:w-3/5">
          <Carousel slides={slidesText} />
        </div>

        {/* Product Section */}
        <div className="mt-20 flex w-full flex-col items-center justify-evenly md:mt-36 lg:mt-36">
          <div className="text-1xl font-bold md:text-2xl lg:text-4xl">
            New Arrival{' '}
          </div>
          <div className="mt-5 flex w-full flex-wrap items-center justify-center md:mt-14 md:gap-x-10 lg:mt-14 lg:gap-x-10">
            {products &&
              products.data?.productInfo
                .slice(0, 4)
                .map((product, index) => (
                  <ProductCard key={index} sdata={product} />
                ))}
          </div>

          <Button
            title="View All"
            bgColor="tranparent"
            textColer="black"
            className="ml-2 mr-9 mt-5 h-11 w-32 border border-gray-300 text-sm duration-500 ease-linear hover:bg-orange-600 hover:text-white md:mt-10 md:w-48 md:text-base lg:mt-10 lg:w-48 lg:text-base"
            onClick={() => navigate('/products')}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
