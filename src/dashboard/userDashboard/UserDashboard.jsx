import { NavLink, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

export default function UserDashboard() {
  const {user}=useAuth()
  return (
    <div>

       <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6  md:block">
        <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
        <nav className="flex flex-col space-y-3">
          <NavLink
            to="/userDashboard/userProfile"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium  ${
                isActive
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="/userDashboard/announcement"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium ${
                isActive
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Announcements
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
    </div>
  )
}
