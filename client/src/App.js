import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body"
import Footer from "./components/Footer";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Profile from "./screens/Profile";
import Wishlist from "./screens/Wishlist";
import Bag from "./screens/Bag";
import ErrorPage from "./components/ErrorPage";
import CategoryPage from "./components/CategoryPage";
import About from "./components/About";
import Login from "./screens/Login";
import RegistrationPage from "./screens/RegistratonPage";
import PlaceOrderPage from "./screens/PlaceOrderPage";
import Products from "./screens/Products";
import SingleProduct from "./screens/SingleProduct";
const Applayout = () =>{
    return(
        <div className="app">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

const appRouter = createBrowserRouter([
    {
       path : "/",
       element : <Applayout/>,
       children : [
        {
            path : "/",
            element : <Body/>,
         },
        {
            path : "/profile",
            element : <Profile/>,
         },
         {
          path : "/register",
          element : <RegistrationPage/>,
       },
         {
          path : "/login",
          element : <Login/>,
        },
         {
            path : "/wishlist",
            element : <Wishlist/>,
         },
         {
            path : "/bag",
            element : <Bag/>,
         },
         {
            path : "/category/:id",
            element : <CategoryPage/>,
         },
         {
            path : "/about",
            element : <About/>,
         },
         {
          path : "/products",
          element : <Products/>,
         },
         {
          path : "/singleProduct",
          element : <SingleProduct/>,
         },
         {
          path : "/placeOrder",
          element : <PlaceOrderPage/>,
       },
       ],
       errorElement : <ErrorPage/>,
    },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
