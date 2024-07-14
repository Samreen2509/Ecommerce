import React, { lazy, Suspense } from 'react';
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
import { ProductDetailsPage } from './screens/product/ProductDetailsPage.js';
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
import PrivateRoute from './components/Routes/PrivateRoute.js';
import Spinner from './components/Spinner.js';
// dashboard imports
const DashboardHeader = lazy(
  () => import('./components/Dashboard/Header/Header')
);
const DashboardSidebar = lazy(
  () => import('./components/Dashboard/Sidebar/Sidebar')
);
const Dashboard = lazy(() => import('./screens/dashboard/Dashboard'));
const DashboardOrder = lazy(() => import('./screens/dashboard/Order'));
const DashboardProduct = lazy(() => import('./screens/dashboard/Product'));
const DashboardUser = lazy(() => import('./screens/dashboard/User'));
const DashboardCategory = lazy(() => import('./screens/dashboard/Category'));
const DashboardColor = lazy(() => import('./screens/dashboard/Color'));
const DashboardNotification = lazy(
  () => import('./screens/dashboard/Notification')
);
const DashboardSetting = lazy(() => import('./screens/dashboard/Setting'));
const DashboardPayment = lazy(() => import('./screens/dashboard/Payment'));

const Applayout = () => {
  return (
    <div className="app">
      <Header />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
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
        path: '/category/:categoryId',
        element: <ProductDetailsPage />,
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
        path: '/singleProduct/:productId',
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
      <PrivateRoute>
        <Suspense fallback={<Spinner />}>
          <DashboardLayout />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<Spinner />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: '/dashboard/order',
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardOrder />
          </Suspense>
        ),
      },
      {
        path: '/dashboard/product',
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardProduct />
          </Suspense>
        ),
      },
      {
        path: '/dashboard/user',
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardUser />
          </Suspense>
        ),
      },
      {
        path: '/dashboard/category',
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardCategory />
          </Suspense>
        ),
      },
      {
        path: '/dashboard/color',
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardColor />
          </Suspense>
        ),
      },
      {
        path: '/dashboard/notification',
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardNotification />
          </Suspense>
        ),
      },
      {
        path: '/dashboard/setting',
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardSetting />
          </Suspense>
        ),
      },
      {
        path: '/dashboard/payment',
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardPayment />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={appRouter} />
    </PersistGate>
  </Provider>
);
