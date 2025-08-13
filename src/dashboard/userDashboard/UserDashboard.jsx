import useAuth from "../../hooks/useAuth"

export default function UserDashboard() {
  const {user}=useAuth()
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">My Profile</h2>
        <h3>Name:{user?.displayName}</h3>
        <h3 className="flex  justify-center">Photo: <img className="h-28 w-28" src= {user?.photoURL} alt="" /></h3>
        <h3>Email:{user?.email}</h3>
      </div>
    </div>
  )
}
