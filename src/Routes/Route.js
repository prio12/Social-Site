import Login from "../Login/Login";
import About from "../Pages/About/About";
import Home from "../Pages/Home/Home";
import Media from "../Pages/Media/Media";
import Message from "../Pages/Message/Message";
import SignUp from "../SignUp/SignUp";

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
            },
            {
                path:'/media',
                element:<Media></Media>
            },
            {
                path:'/message',
                element:<Message></Message>
            },
            {
                path:'/about',
                element:<About></About>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signUp',
                element:<SignUp></SignUp>
            }
        ]
    }
])