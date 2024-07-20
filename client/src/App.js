import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store.js';
import ScrollToTop from './utils/ScrollTop';
import Spinner from './components/Spinner';
import ErrorPage from './components/Error/ErrorPage';
import Shimmer from './components/Loading/Shimmer.js';
import PrivateRoute from './components/Routes/PrivateRoute';

// Layouts
const Applayout = lazy(() => import('./components/Layout/AppLayout'));
const DashboardLayout = lazy(
  () => import('./components/Layout/DashboardLayout')
);

// Screens
const Body = lazy(() => import('./components/Home/Body'));
const Profile = lazy(() => import('./screens/User/Profile'));
const Register = lazy(() => import('./screens/auth/Register'));
const Login = lazy(() => import('./screens/auth/Login'));
const ForgotPassword = lazy(() => import('./screens/auth/ForgotPassword'));
const Wishlist = lazy(() => import('./screens/BAG/Wishlist'));
const Bag = lazy(() => import('./screens/BAG/Bag'));
const SearchProduct = lazy(() => import('./screens/product/SearchProduct'));
const About = lazy(() => import('./screens/Footer/About'));
const ProductDetailsPage = lazy(
  () => import('./screens/product/ProductDetailsPage')
);
const CollectionPage = lazy(
  () => import('./screens/collertion/CollectionPage')
);
const Category = lazy(() => import('./screens/category/Category'));
const ProductPage = lazy(() => import('./screens/product/ProductPage'));
const SingleProduct = lazy(() => import('./screens/product/SingleProduct'));
const Myorders = lazy(() => import('./screens/User/MyOrderPage'));
const PlaceOrderPage = lazy(() => import('./screens/order/PlaceOrderPage'));
const OrderSuccessPage = lazy(() => import('./screens/order/OrderSuccessPage'));
const VerifyEmail = lazy(() => import('./screens/auth/VerifyEmail'));
const ResetPassword = lazy(() => import('./screens/auth/ResetPassword'));

// Dashboard Screens
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

// Router
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <Suspense fallback={<Shimmer />}>
          <Applayout />
        </Suspense>
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Body /> },
      { path: '/profile', element: <Profile /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/forgotpassword', element: <ForgotPassword /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/bag', element: <Bag /> },
      { path: '/search/:query', element: <SearchProduct /> },
      { path: '/category/:categoryId', element: <ProductDetailsPage /> },
      { path: '/collections', element: <CollectionPage /> },
      { path: '/about', element: <About /> },
      { path: '/category', element: <Category /> },
      { path: '/products', element: <ProductPage /> },
      { path: '/singleProduct/:productId', element: <SingleProduct /> },
      { path: '/myorders', element: <Myorders /> },
      { path: '/placeOrder/payment', element: <PlaceOrderPage /> },
      { path: '/success', element: <OrderSuccessPage /> },
      { path: '/emailVerify', element: <VerifyEmail /> },
      { path: '/resetPassword/:token', element: <ResetPassword /> },
    ],
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
    errorElement: <ErrorPage />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/dashboard/order', element: <DashboardOrder /> },
      { path: '/dashboard/product', element: <DashboardProduct /> },
      { path: '/dashboard/user', element: <DashboardUser /> },
      { path: '/dashboard/category', element: <DashboardCategory /> },
      { path: '/dashboard/color', element: <DashboardColor /> },
      { path: '/dashboard/notification', element: <DashboardNotification /> },
      { path: '/dashboard/setting', element: <DashboardSetting /> },
      { path: '/dashboard/payment', element: <DashboardPayment /> },
    ],
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
