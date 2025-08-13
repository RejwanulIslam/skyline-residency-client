import { NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useTanStackQuery from '../hooks/useTanStackQuery'
import userRole from '../hooks/userRole'

export default function Navbar() {
    const { user, signOutUser } = useAuth()
    const { role } = userRole()
    console.log(role)
    const userData = useTanStackQuery('/user', 'user')
    console.log(userData)
    const item = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/apartment">Apartment</NavLink></li>
        <li><NavLink to="/signup">Sign UP</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {item}
                        </ul>
                    </div>
                    <div className='flex items-center'>
                        <img className='h-16 w-16' src="/logo.png"></img>
                        <h2 className='text-xl font-bold'>MY BUILDING</h2>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {item}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user && <div className="dropdown dropdown-bottom dropdown-end">
                            <label tabIndex={0}> <img className='btn btn-circle h-16 w-16 rounded-full' src={user?.photoURL}></img></label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>


                                    {role == 'user' && <NavLink to="/userDashboard">User Dashbard</NavLink>
                                    }
                                    {role == 'admin' && <NavLink to="/adminDashboard">Admin Dashbard</NavLink>
                                    }


                                </li>
                                <li><button onClick={() => signOutUser()}>Logout</button></li>

                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
