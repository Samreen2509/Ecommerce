import React from 'react';
import ReactDOM from 'react-dom/client';
import Body from './components/Body';
import Footer from './components/Footer';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import Profile from './screens/Profile';
import Wishlist from './screens/Wishlist';
import ErrorPage from './components/ErrorPage';
import CategoryPage from './components/CategoryPage';
import About from './components/About';
import PlaceOrderPage from './screens/PlaceOrderPage';
import Header from './components/Header/Header.js';
import Bag from './screens/BAG/Bag.js';
import RegistrationPage from './screens/RegistratonPage.js';
import Login from './screens/Login.js';
import Products from './screens/Products';
import SingleProduct from './screens/SingleProduct.js';
import OrderPage from './screens/OrderPage.js';
// import SearchPage from './components/Header/SearchPage.js';
import SearchProduct from './screens/SearchProduct.js';

const Applayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/register',
        element: <RegistrationPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/wishlist',
        element: <Wishlist />,
      },
      {
        path: '/bag',
        element: <Bag />,
      },
      {
        path: '/search/:query',
        element: <SearchProduct />,
      },
      {
        path: '/category/:id',
        element: <CategoryPage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/singleProduct',
        element: <SingleProduct />,
      },
      {
        path: '/myorders',
        element: <OrderPage />,
      },
      {
        path: '/placeOrder',
        element: <PlaceOrderPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
