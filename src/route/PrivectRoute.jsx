import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function PrivectRoute({ children }) {
    const { user, loading } = useAuth()
    const location=useLocation()
    if (loading) return <p>Loading...</p>
    if (user) return children
    if (!user) return <Navigate to="/login" state={{from:location}}></Navigate>
}
