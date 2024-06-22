import React from 'react';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartProducts } from '../../features/cartSlice';
import { toast } from 'react-toastify';

function AddToCart({ id: _id, quantity, className }) {
  const dispatch = useDispatch();
  const { productTotalQty } = useSelector((state) => state.cart);
  const { isUserLogin } = useSelector((state) => state.auth);

  const handleaddCart = () => {
    if (isUserLogin) {
      dispatch(addToCart({ productId: _id, quantity: quantity }));
      dispatch(getCartProducts());
      if (productTotalQty > 0) {
        toast.success('Product added to Bag successfully');
      }
    }
  };

  if (!isUserLogin)
    return (
      <Button type="button" className={className}>
        Add To Cart
      </Button>
    );

  return (
    <Button
      onClick={() => handleaddCart(_id)}
      type="button"
      className={className}
    >
      Add To Cart
    </Button>
  );
}

export default AddToCart;
