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

function AddToCart({ productId, quantity, className, wishlistBtn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserLogin } = useSelector((state) => state.auth);

  const handleAddCartClick = () => {
    if (isUserLogin) {
      dispatch(addToCart({ productId, quantity }));
      if (wishlistBtn) {
        dispatch(removeFromWishlist({ id: productId }));
        dispatch(getWishListProducts());
      }
      toast.success('Product added to Bag successfully');
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
    />
  );
}

export default AddToCart;
