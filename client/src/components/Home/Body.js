import Shimmer from '../Loading/Shimmer.js';
import { useEffect } from 'react';
import Carousel from './Carousel.js';
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
    dispatch(getAllProducts());
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
          <Carousel slides={slidesImg} />
        </div>

        {/* Category Section */}
        <div className="mt-36 flex min-h-min flex-col items-center justify-center">
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
            className="text-1xl h-14 w-60 border border-solid duration-500 ease-linear hover:bg-slate-950 hover:text-white"
            onClick={() => navigate('/category')}
          />
        </div>

        {/* Product Section */}
        <div className="m-14 mt-36 flex w-full flex-col items-center justify-evenly">
          <div className="relative top-12">
            <span className="mr-28 text-4xl font-bold">New Arrival</span>
          </div>
          <div className="flex flex-wrap items-center justify-center">
            {products &&
              products.data?.productInfo.slice(0, 4).map((product) => (
                <Link
                  to={`/singleProduct/${product._id}`}
                  className="link"
                  key={product._id}
                >
                  <ProductCard sdata={product} />
                </Link>
              ))}
          </div>

          <Button
            title="View All"
            bgColor="tranparent"
            textColer="black"
            className="text-1xl mr-28 mt-20 h-14 w-60 border border-solid duration-500 ease-linear hover:bg-slate-950 hover:text-white"
            onClick={() => navigate('/products')}
          />
        </div>

        {/* Details */}
        <div className="mt-24 flex w-full flex-wrap items-center justify-evenly gap-5">
          <div className="flex w-1/3 items-center gap-2">
            <img src={img1} alt="img" className="h-8 w-10 object-contain" />
            <p className="text-xs">
              <strong>FREE SHIPPING : </strong>All orders of 499/- or more of
              eligible items across any product category qualify.
            </p>
          </div>
          <div className="flex w-1/3 items-center gap-2">
            <img src={img2} alt="img" className="h-8 w-10 object-contain" />
            <p className="text-xs">
              <strong>CREDIT CARDS : </strong> We accept Visa, American Express,
              Mastercard, and Discover
            </p>
          </div>
          <div className="flex w-1/3 items-center gap-2">
            <img src={img3} alt="img" className="h-8 w-10 object-contain" />
            <p className="text-xs">
              <strong>RETURN POLICY : </strong>You can return your online order
              within 30 days of receiving your order.
            </p>
          </div>
        </div>

        {/* Banner */}
        <div className="mt-20">
          <div className="grid items-center justify-center">
            <span className=" text-2xl font-extrabold">Shop The Look</span>
            <span className="m-auto text-xs">Trending Outfits Men</span>
          </div>

          <div className="mt-10 flex h-auto w-full items-center justify-center gap-10">
            <div className="h-auto w-auto duration-300 hover:scale-110">
              <img
                src={img4}
                alt="Cloth"
                className="h-96 w-full rounded-lg object-contain"
              />
            </div>
            <div className="h-auto w-auto duration-300 hover:scale-110">
              <img
                src={img5}
                alt="Cloth"
                className="h-96 w-full rounded-lg object-contain"
              />
            </div>
          </div>
        </div>

        {/* TESTIMONIAL */}
        <div className="m-auto mb-40 mt-24 w-3/5">
          <Carousel slides={slidesText} />
        </div>
      </div>
    </div>
  );
};

export default Body;
