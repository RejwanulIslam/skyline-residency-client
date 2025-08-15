import { NavLink, Outlet } from "react-router-dom";

export default function MemberDashboard() {
    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-indigo-600">Member Panel</h2>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    <NavLink
                        to="/memberDashboard/memberProfile"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                ? "bg-indigo-500 text-white shadow-md"
                                : "text-gray-700 hover:bg-indigo-50"
                            }`
                        }
                    >
                        <span className="text-lg">👤</span>
                        My Profile
                  
                    </NavLink>

                    <NavLink
                        to="/dashboard/payment"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                ? "bg-indigo-500 text-white shadow-md"
                                : "text-gray-700 hover:bg-indigo-50"
                            }`
                        }
                    >
                        <span className="text-lg">💳</span>
                        Make Payment
                    
                    </NavLink>

                    <NavLink
                        to="/dashboard/payment-history"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                ? "bg-indigo-500 text-white shadow-md"
                                : "text-gray-700 hover:bg-indigo-50"
                            }`
                        }
                    >
                        <span className="text-lg">⏳</span>
                        Payment History
                       
                    </NavLink>

                    <NavLink
                        to="/dashboard/announcements"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                ? "bg-indigo-500 text-white shadow-md"
                                : "text-gray-700 hover:bg-indigo-50"
                            }`
                        }
                    >
                        <span className="text-lg">📢</span>
                        Announcements
                      
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}
