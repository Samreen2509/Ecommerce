import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  getWishListProducts,
  removeFromWishlist,
} from '../../features/wishlistSlice';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

function WishlistBtn({ id }) {
  const dispatch = useDispatch();
  const { totalWishProductsId } = useSelector((state) => state.wishlist);
  const { isUserLogin } = useSelector((state) => state.auth);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (isUserLogin) {
      dispatch(getWishListProducts());
    }
  }, [dispatch]);

  useState(() => {
    if (totalWishProductsId && totalWishProductsId.includes(id)) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [totalWishProductsId]);

  const handleAddWishLit = () => {
    dispatch(addToWishlist({ id }));
    toast.success('Added to Wishlist', {
      autoClose: 500,
    });
    setAdded(true);
  };

  const handleRemove = () => {
    dispatch(removeFromWishlist({ id }));
    toast.success('Removed from Wishlist', {
      autoClose: 500,
    });
    setAdded(false);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    added ? handleRemove() : handleAddWishLit();
  };

  return (
    <>
      <div
        onClick={handleOnClick}
        className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-black text-xl text-white shadow-md transition duration-1000 hover:bg-opacity-80"
      >
        {added ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
      </div>
    </>
  );
}

export default WishlistBtn;
