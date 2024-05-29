import React from 'react';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartProducts } from '../../features/cartSlice';
import { toast } from 'react-toastify';

function AddToCart({ id: _id, quantity }) {
  const dispatch = useDispatch();
  const { productTotalQty } = useSelector((state) => state.cart);

  const handleaddCart = () => {
    dispatch(addToCart({ productId: _id, quantity: quantity }));
    dispatch(getCartProducts());
    if (productTotalQty > 0) {
      toast.success('Product added to Bag successfully');
    }
  };

  return (
    <Button
      onClick={() => handleaddCart(_id)}
      type="button"
      className="relative bottom-0 right-11 m-auto flex w-96 scale-50 items-center justify-center rounded-lg px-10 py-8 text-center  text-xl text-white opacity-0 transition-all duration-500 hover:bg-orange-600 group-hover:bottom-24 group-hover:opacity-100"
    >
      Add To Cart
    </Button>
  );
}

export default AddToCart;
