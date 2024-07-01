import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import ErrorPage from './components/Error/ErrorPage';
import Header from './components/Header/Header.js';
import Footer from './screens/Footer/Footer.js';
import Body from './components/Home/Body.js';
import Profile from './screens/User/Profile.js';
import RegistrationPage from './screens/auth/RegistratonPage.js';
import Login from './screens/auth/Login.js';
import Wishlist from './screens/BAG/Wishlist.js';
import Bag from './screens/BAG/Bag.js';
import SearchProduct from './screens/product/SearchProduct.js';
import ProductDetailsPage from './screens/product/ProductDetailsPage.js';
import About from './screens/Footer/About.js';
import SingleProduct from './screens/product/SingleProduct.js';
import ErrorPage from './components/Error/ErrorPage';
import Myorders from './screens/User/MyOrderPage.js';
import PlaceOrderPage from './screens/order/PlaceOrderPage.js';
import Notification from './components/Notification.js';
import ResetPassword from './screens/auth/ResetPassword.js';
import VerifyEmail from './screens/auth/VerifyEmail.js';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import ProductPage from './screens/product/ProductPage.js';
import PrivateRoute from './components/Routes/PrivateRoute.js';
import Category from './screens/category/Category.js';
import OrderSuccessPage from './screens/order/OrderSuccessPage.js';
import CollectionPage from './screens/collertion/CollectionPage.js';

// dashboard imports
import DashboardHeader from './components/Dashboard/Header/Header.js';
import DashboardSidebar from './components/Dashboard/Sidebar/Sidebar.js';
import Dashboard from './screens/dashboard/Dashboard.js';
import DashboardOrder from './screens/dashboard/Order.js';
import DashboardProduct from './screens/dashboard/Product.js';
import DashboardUser from './screens/dashboard/User.js';
import DashboardCategory from './screens/dashboard/Category.js';
import DashboardSetting from './screens/dashboard/Setting.js';

const Applayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
};

const DashboardLayout = () => {
  return (
    <div className="fixed h-full w-full">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <div className="custom-h-sidebar flex-grow overflow-auto px-5 py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Notification />
        <Applayout />
      </>
    ),
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
        path: '/forgotpassword',
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
        element: <ProductDetailsPage />,
      },
      {
        path: '/blog',
        element: <CollectionPage />,
      },
      {
        path: '/collections',
        element: <CollectionPage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/category',
        element: <Category />,
      },
      {
        path: '/products',
        element: <ProductPage />,
      },
      {
        path: '/singleProduct/:categoryId',
        element: <SingleProduct />,
      },

      {
        path: '/myorders',
        element: <Myorders />,
      },
      {
        path: '/placeOrder/payment',
        element: <PlaceOrderPage />,
      },
      {
        path: '/success',
        element: <OrderSuccessPage />,
      },
      {
        path: '/emailVerify',
        element: <VerifyEmail />,
      },
      {
        path: '/resetPassword',
        element: <ResetPassword />,
      },
      {
        path: '/success',
        element: <OrderSuccessPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: (
      <>
        <DashboardLayout />
      </>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/dashboard/order',
        element: <DashboardOrder />,
      },
      {
        path: '/dashboard/product',
        element: <DashboardProduct />,
      },
      {
        path: '/dashboard/user',
        element: <DashboardUser />,
      },
      {
        path: '/dashboard/category',
        element: <DashboardCategory />,
      },
      {
        path: '/dashboard/setting',
        element: <DashboardSetting />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
