import { NavLink, Outlet, useLocation } from "react-router-dom";
import useTanStackQuery from "../../hooks/useTanStackQuery";

export default function AdminDashboard() {
    const user=useTanStackQuery('/user','user')
    const location = useLocation()
    console.log(location)
    return (
        <div>
            <div className="min-h-screen bg-gray-50 text-gray-800 flex">
                {/* Sidebar */}
                <div className="w-64  bg-white shadow-sm p-4 space-y-2">
                    <nav className="space-y-2">
                        <NavLink to="/" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 font-medium">👤 Admin Profile</NavLink>
                        <NavLink to="/adminDashboard/manageMembers" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 font-medium">👥 Manage Members</NavLink>
                        <NavLink to="/" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 font-medium">📢 Make Announcement</NavLink>
                        <NavLink to="/adminDashboard/agreement" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 font-medium">📄 Agreement Requests</NavLink>
                        <NavLink to="/" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 font-medium">🎟️ Manage Coupons</NavLink>
                    </nav>
                </div>

                {/* Content Area */}
                {
                    location.pathname == '/adminDashboard' && <main className=" flex-1 p-6">
                        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-4 bg-indigo-50 rounded-lg">
                                    <h2 className="text-lg font-semibold">Active Members</h2>
                                    <p className="text-2xl font-bold mt-2">1,243</p>
                                    <p className="text-sm text-gray-500 mt-1">Members currently active in the system</p>
                                </div>
                                <div className="p-4 bg-yellow-50 rounded-lg">
                                    <h2 className="text-lg font-semibold">Pending Agreements</h2>
                                    <p className="text-2xl font-bold mt-2">8</p>
                                    <p className="text-sm text-gray-500 mt-1">Awaiting admin approval</p>
                                </div>
                                <div className="p-4 bg-pink-50 rounded-lg">
                                    <h2 className="text-lg font-semibold">Active Coupons</h2>
                                    <p className="text-2xl font-bold mt-2">12</p>
                                    <p className="text-sm text-gray-500 mt-1">Currently valid for use</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <h2 className="text-lg font-semibold">Total Announcements</h2>
                                    <p className="text-2xl font-bold mt-2">34</p>
                                    <p className="text-sm text-gray-500 mt-1">All announcements made to members</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <h2 className="text-lg font-semibold">Total Members</h2>
                                    <p className="text-2xl font-bold mt-2">1,500</p>
                                    <p className="text-sm text-gray-500 mt-1">Including active and inactive members</p>
                                </div>
                            </div>
                        </div>
                    </main>
                }
                {
                    location.pathname !== '/adminDashboard' &&
                    <div className="w-8/12">
                        <Outlet></Outlet>
                    </div>
                }
            </div>



        </div>
    )
}
