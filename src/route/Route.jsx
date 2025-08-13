import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Layout from "../layout/Layout";
import Home from "../page/Home";
import SignUp from "../component/SignUp";
import Login from "../component/Login";
import Apartment from "../page/Apartment";
import UserDashboard from "../dashboard/userDashboard/UserDashboard";
import AdminDashboard from "../dashboard/adminDashboard/AdminDashboard";
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
            {
                path:'/apartment',
                element: <Apartment></Apartment>
            },
            {
                path:'/userDashboard',
                element: <UserDashboard></UserDashboard>
            },
            {
                path:'/adminDashboard',
                element: <AdminDashboard></AdminDashboard>
            },
        ]
    }
])
export default router;
