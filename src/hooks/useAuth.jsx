import { useContext } from "react"
import { authcontex } from "../authcontex/AuthProvider"

export default function useAuth() {
    const auth =useContext(authcontex)
  return (
    auth
  )
}
