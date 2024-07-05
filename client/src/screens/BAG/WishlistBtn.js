import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  getWishListProducts,
  removeFromWishlist,
} from '../../features/wishlistSlice';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { debounce } from '../../components/debounce';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function WishlistBtn({ id: _id }) {
  const dispatch = useDispatch();
  const { totalWishProducts, totalWishProductsId, isLoading } = useSelector(
    (state) => state.wishlist
  );
  const { isUserLogin } = useSelector((state) => state.auth);
  const productAlreadyInWishList = totalWishProductsId.includes(_id);

  useEffect(() => {
    if (isUserLogin) {
      dispatch(getWishListProducts());
    }
  }, [dispatch]);

  const handleaddCart = debounce(() => {
    dispatch(addToWishlist({ productId: _id }));
    if (totalWishProducts + 1) {
      toast.success('Product added Wishlist successfully', {
        autoClose: 500,
      });
    }
    dispatch(getWishListProducts());
  }, 500);

  const handleRemove = debounce(() => {
    dispatch(removeFromWishlist({ _id }));
    if (totalWishProducts - 1) {
      toast.success('Product removed from Wishlist successfully', {
        autoClose: 500,
      });
    }
    dispatch(getWishListProducts());
  }, 500);

  const handleOnClick = () => {};

  return (
    <>
      <div
        onClick={handleOnClick}
        className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-black text-xl text-white shadow-md transition duration-1000 hover:bg-opacity-80"
      >
        <FaRegHeart />
      </div>
    </>
  );
}

export default WishlistBtn;
