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
import OrderPage from './screens/OrderPage';
import PaymentPage from './screens/PaymentPage';
import ShippingPage from './screens/ShippingPage';
import Header from './components/Header/Header.js';
import Bag from './screens/BAG/Bag.js';

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
        path: '/wishlist',
        element: <Wishlist />,
      },
      {
        path: '/bag',
        element: <Bag />,
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
        path: '/orderpage',
        element: <OrderPage />,
      },
      {
        path: '/payment',
        element: <PaymentPage />,
      },
      {
        path: '/shipping',
        element: <ShippingPage />,
      },
      {
        path: '/placeorderpage',
        element: <PlaceOrderPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
