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
import DashboardColor from './screens/dashboard/Color.js';
import DashboardNotification from './screens/dashboard/Notification.js';
import DashboardSetting from './screens/dashboard/Setting.js';
import PrivateRoute from './components/Routes/PrivateRoute.js';

const AppLayout = () => (
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

const DashboardLayout = () => {
  return (
    <div className="fixed h-full w-full">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-grow overflow-auto px-5 py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const DashboardLayoutWrapper = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <DashboardLayout />
    </PersistGate>
  </Provider>
);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Notification />
        <AppLayout />
      </>
    ),
    children: [
      { path: '/', element: <Body /> },
      { path: '/profile', element: <Profile /> },
      { path: '/register', element: <RegistrationPage /> },
      { path: '/login', element: <Login /> },
      { path: '/forgotpassword', element: <Login /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/bag', element: <Bag /> },
      { path: '/search/:query', element: <SearchProduct /> },
      { path: '/category/:id', element: <ProductDetailsPage /> },
      { path: '/blog', element: <CollectionPage /> },
      { path: '/collections', element: <CollectionPage /> },
      { path: '/about', element: <About /> },
      { path: '/category', element: <Category /> },
      { path: '/products', element: <ProductPage /> },
      { path: '/singleProduct/:categoryId', element: <SingleProduct /> },
      { path: '/myorders', element: <Myorders /> },
      { path: '/placeOrder/payment', element: <PlaceOrderPage /> },
      { path: '/success', element: <OrderSuccessPage /> },
      { path: '/emailVerify', element: <VerifyEmail /> },
      { path: '/resetPassword', element: <ResetPassword /> },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayoutWrapper />,
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'order',
        element: (
          <PrivateRoute>
            <DashboardOrder />
          </PrivateRoute>
        ),
      },
      {
        path: 'product',
        element: (
          <PrivateRoute>
            <DashboardProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'user',
        element: (
          <PrivateRoute>
            <DashboardUser />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <DashboardUser />
          </PrivateRoute>
        ),
      },
      {
        path: 'notification',
        element: (
          <PrivateRoute>
            <DashboardNotification />
          </PrivateRoute>
        ),
      },
      {
        path: 'category',
        element: (
          <PrivateRoute>
            <DashboardCategory />
          </PrivateRoute>
        ),
      },
      {
        path: 'color',
        element: (
          <PrivateRoute>
            <DashboardColor />
          </PrivateRoute>
        ),
      },
      {
        path: 'setting',
        element: (
          <PrivateRoute>
            <DashboardSetting />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
