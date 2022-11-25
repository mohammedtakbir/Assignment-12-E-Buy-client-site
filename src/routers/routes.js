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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/category/:name',
                element: <PrivateRoute><AllProducts /></PrivateRoute>
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrders />
            },
            {
                path: '/dashboard/addAProducts',
                element: <AddAProducts/>
            },
            {
                path: '/dashboard/myProducts',
                element: <MyProducts />
            },
        ]
    }
])