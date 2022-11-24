import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home/Home";
import ProductCategory from "../Pages/Home/ProductCategories/ProductCategory";

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
                path: '/category/:brandName',
                element: <ProductCategory />
            }
        ]
    }
])