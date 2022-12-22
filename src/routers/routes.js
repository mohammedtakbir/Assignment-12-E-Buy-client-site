import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home/Home";
import AllProducts from '../Pages/AllProducts/AllProducts'
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import MyOrders from "../Dashboard/MyOrders/MyOrders";
import AddAProducts from "../Dashboard/AddAProducts/AddAProducts";
import MyProducts from "../Dashboard/MyProducts/MyProducts";
import AllBuyers from "../Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Dashboard/AllSellers/AllSellers";
import Blogs from "../Pages/Blogs/Blogs";
import Payment from "../Pages/Payment/Payment";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import ReportedItems from "../Dashboard/ReportedItems/ReportedItems";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import BookingProduct from "../Pages/BookingProduct/BookingProduct";
import SelectedItemDetails from "../Pages/SelectedItemDetails/SelectedItemDetails";
import SelectedNewArrivalItem from "../Pages/SelectedNewArrivalItem/SelectedNewArrivalItem";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/category/:name',
                element: <AllProducts />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/booking-page/:id',
                element: <PrivateRoute><BookingProduct /></PrivateRoute>
            },
            {
                path: '/selected-items-details/:id',
                element: <SelectedItemDetails />
            },
            {
                path: '/selected-newArrival-items/:id',
                element: <SelectedNewArrivalItem />
            },
        ]
    },
    {
        path: '/dashboard',
        errorElement: <ErrorPage />,
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/myOrders',
                element: <MyOrders />
            },
            {
                path: '/dashboard/addAProducts',
                element: <SellerRoute><AddAProducts /></SellerRoute>
            },
            {
                path: '/dashboard/myProducts',
                element: <SellerRoute><MyProducts /></SellerRoute>
            },
            {
                path: '/dashboard/allSellers',
                element: <AdminRoute><AllSellers /></AdminRoute>
            },
            {
                path: '/dashboard/allBuyers',
                element: <AdminRoute><AllBuyers /></AdminRoute>
            },
            {
                path: '/dashboard/reportedItems',
                element: <AdminRoute><ReportedItems /></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment />
            },
        ]
    }
])