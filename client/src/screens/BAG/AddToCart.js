import React from 'react';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartProducts } from '../../features/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddToCart({ productId, quantity, isUserLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddCartClick = () => {
    if (isUserLogin) {
      dispatch(addToCart({ productId, quantity }));
      toast.success('Product added to Bag successfully');
    } else {
      navigate('./login');
    }
  };

  return (
    <Button onClick={handleAddCartClick} type="button">
      Add to Bag
    </Button>
  );
}

export default AddToCart;
