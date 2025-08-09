import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import auth from "../firebase/firebase.init"

export const authcontex = createContext(null)
export default function AuthProvider({ children }) {
  const [user, setuser] = useState(null)
  const [loading, setloading] = useState(true)
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
    const unSuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user)
      }
      else{
        setuser(null)
      } 
    })
    return () => unSuscribe()
  }, [])
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

