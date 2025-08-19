import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Layout from "../layout/Layout";
import Home from "../page/Home";
import SignUp from "../component/SignUp";
import Login from "../component/Login";
import Apartment from "../page/Apartment";
import UserDashboard from "../dashboard/userDashboard/UserDashboard";
import AdminDashboard from "../dashboard/adminDashboard/AdminDashboard";
import Agreement from "../dashboard/adminDashboard/Agreement";
import ManageMembers from "../dashboard/adminDashboard/ManageMembers";
import MemberDashboard from "../dashboard/memberDashboard/MemberDashboard";
import MemberProfile from "../dashboard/memberDashboard/MemberProfile";
import Payment from "../dashboard/memberDashboard/payment/Payment";
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

            // AdminDashboard
            {
                path:'/adminDashboard',
                element: <AdminDashboard></AdminDashboard>,
                children:[
                    {
                        path:'/adminDashboard/agreement',
                        element:<Agreement></Agreement>
                    },
                    {
                        path:'/adminDashboard/manageMembers',
                        element:<ManageMembers></ManageMembers>
                    }
                ]
            },

            //member Dashboard
            {
                path:'/memberDashboard',
                element:<MemberDashboard></MemberDashboard>,
                children:[
                    {
                        path:'/memberDashboard/memberProfile',
                        element:<MemberProfile></MemberProfile>
                    },
                    {
                        path:'/memberDashboard/payment',
                        element:<Payment></Payment>
                    },
                ]
            }
        ]
    }
])
export default router;
