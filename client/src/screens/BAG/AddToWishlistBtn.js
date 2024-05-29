import React from 'react';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../../features/wishlistSlice';
import { FaRegHeart } from 'react-icons/fa';

function AddToWishlistBtn({ id: _id }) {
  const dispatch = useDispatch();
  // const { totalWishProducts } = useSelector((state) => state.cart);

  const handleaddCart = () => {
    dispatch(addToWishlist({ productId: _id }));
    //   dispatch(getCartProducts());
    //   if (totalWishProducts > 0) {
    //     toast.success('Product added Wishlist successfully');
    //   }
  };

  return (
    <div className=" relative right-11 top-28 float-left ml-3 flex h-11 w-11 flex-col items-center justify-center rounded-full text-black  opacity-0 transition-all duration-300 hover:bg-black hover:text-white group-hover:right-0 group-hover:opacity-100">
      <button
        className="absolute z-50 h-6 w-9 transition-all duration-300 "
        onClick={() => handleaddCart(_id)}
        type="button"
      >
        <FaRegHeart size={25} className="relative left-[5px]" />
      </button>
    </div>
  );
}

export default AddToWishlistBtn;
