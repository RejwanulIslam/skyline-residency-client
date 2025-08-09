import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Layout from "../layout/Layout";
import Home from "../page/Home";
import SignUp from "../component/SignUp";
import Login from "../component/Login";
const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout></Layout>,
        children:[
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/signup',
                element: <SignUp></SignUp>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
        ]
    }
])
export default router;
