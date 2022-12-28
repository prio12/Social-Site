import Home from "../Pages/Home/Home";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Outlet/Main");

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            }
        ]
    }
])