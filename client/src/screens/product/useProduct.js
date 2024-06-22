import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { getAllProducts } from '../../features/productSlice.js';

const useProduct = (id) => {
  const [productSection, setProductSection] = useState(null);
//   const { products } = useSelector((state) => state.product);
//   setProductSection(products);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllProducts());
//   }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await fetch('https://fakestoreapi.com/products');
  //       const json = await data.json();
  //       setProductSection(json);
  //     };
  //     fetchData();
  //   }, []);
  return productSection;
};

export default useProduct;
