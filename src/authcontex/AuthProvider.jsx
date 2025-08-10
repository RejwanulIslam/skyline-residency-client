import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import auth from "../firebase/firebase.init"
import useAxiosPublick from "../hooks/useAxiosPublick"

export const authcontex = createContext(null)
export default function AuthProvider({ children }) {
  const [user, setuser] = useState(null)
  const [loading, setloading] = useState(true)
  const axiosPublick=useAxiosPublick()
  console.log(user)
  const emailSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const UserUpdateProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
  }

  const emailLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signOutUser = () => {
    return signOut(auth)
  }
  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        setuser(user)
        const userInfo={email:user?.email}
      const {data}=await axiosPublick.post('/jwt',userInfo)
      
      if(data.token){
        localStorage.setItem('access-token',data.token)
        console.log('access-token',data.token)
        console.log('access-get-token',localStorage.getItem('access-token',data.token))
      }

      }
      else{
        setuser(null)
        localStorage.removeItem('access-token')
      } 
    })
    return () => unSuscribe()
  }, [axiosPublick])
  const authInfo = {
    user,
    emailSignUp,
    emailLogin,
    UserUpdateProfile,
    signOutUser,
    loading,
    setloading,
  }

  return (
    <authcontex.Provider value={authInfo}>
      {children}
    </authcontex.Provider>
  )
}

