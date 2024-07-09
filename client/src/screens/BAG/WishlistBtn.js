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
import { useNavigate } from 'react-router-dom';

function WishlistBtn({ id, mode, isUserLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalWishProductsId } = useSelector((state) => state.wishlist);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (isUserLogin) {
      dispatch(getWishListProducts());
    } else {
      navigate('./login');
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (totalWishProductsId.includes(id)) {
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

  let style;
  if (mode && mode == 'normal') {
    style = '';
  } else {
    style = 'absolute right-2 top-2';
  }

  return (
    <>
      <div
        onClick={handleOnClick}
        className={`${style} flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black text-xl text-white shadow-md transition duration-1000 hover:bg-opacity-80`}
      >
        {added ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
      </div>
    </>
  );
}

export default WishlistBtn;
