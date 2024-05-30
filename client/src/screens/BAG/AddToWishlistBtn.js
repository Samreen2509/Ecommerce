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

function AddToWishlistBtn({ id: _id }) {
  const dispatch = useDispatch();
  const { totalWishProducts, totalWishProductsId, isLoading } = useSelector(
    (state) => state.wishlist
  );
  const productAlreadyInWishList = totalWishProductsId.includes(_id);

  useEffect(() => {
    dispatch(getWishListProducts());
  }, [dispatch]);

  const handleaddCart = debounce(() => {
    dispatch(addToWishlist({ productId: _id }));
    dispatch(getWishListProducts());
    if (totalWishProducts + 1) {
      toast.success('Product added Wishlist successfully');
    }
  }, 500);

  const handleRemove = debounce(() => {
    dispatch(removeFromWishlist({ _id }));
    dispatch(getWishListProducts());
    if (totalWishProducts + 1) {
      toast.success('Product removed from Wishlist successfully');
    }
  }, 1000);

  return (
    <div className="relative right-11 top-28 float-left ml-3 flex h-11 w-11 flex-col items-center justify-center rounded-full text-black opacity-0 transition-all duration-300 hover:bg-black hover:text-white group-hover:right-0 group-hover:opacity-100">
      {productAlreadyInWishList ? (
        <button
          className="absolute z-50 h-6 w-9"
          onClick={() => handleRemove(_id)}
          type="button"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters
              size={25}
              className="relative left-[5px] animate-spin"
            />
          ) : (
            <FaHeart size={25} className="relative left-[5px]" />
          )}
        </button>
      ) : (
        <button
          className="absolute z-50 h-6 w-9 transition-all duration-300 "
          onClick={() => handleaddCart(_id)}
          type="button"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters
              size={25}
              className="relative left-[5px] animate-spin"
            />
          ) : (
            <FaRegHeart size={25} className="relative left-[5px]" />
          )}
        </button>
      )}
    </div>
  );
}

export default AddToWishlistBtn;
