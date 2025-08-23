import React from 'react'
import userRole from '../hooks/userRole'
import { Navigate } from 'react-router-dom'

export default function AdminRoute({children}) {
    const{role}=userRole()

 if(role=='admin') return children
 if(role!=='admin') return <Navigate to='/'></Navigate>

}
