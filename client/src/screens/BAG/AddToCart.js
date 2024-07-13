import React from 'react';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  getWishListProducts,
  removeFromWishlist,
} from '../../features/wishlistSlice';

function AddToCart({ productId, quantity, className, wishlistBtn, size }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserLogin } = useSelector((state) => state.auth);

  const handleAddCartClick = () => {
    if (isUserLogin) {
      dispatch(addToCart({ productId, quantity, size }));
      toast.success('Product added to Bag successfully');
      if (wishlistBtn) {
        dispatch(removeFromWishlist({ id: productId }));
        dispatch(getWishListProducts());
      }
      navigate('/bag');
    } else {
      navigate('/login');
    }
  };

  return (
    <Button
      title={'Add To Bag'}
      onClick={handleAddCartClick}
      type="button"
      className={className}
      disabled={!size}
    />
  );
}

export default AddToCart;
