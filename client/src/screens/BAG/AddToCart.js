import React from 'react';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddToCart({ productId, quantity, className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUserLogin } = useSelector((state) => state.auth);

  const handleAddCartClick = () => {
    console.log(productId, quantity);
    if (isUserLogin) {
      dispatch(addToCart({ productId, quantity }));
      toast.success('Product added to Bag successfully');
    } else {
      navigate('./login');
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
