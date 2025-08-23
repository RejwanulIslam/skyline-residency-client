import React from 'react'
import userRole from '../hooks/userRole'
import { Navigate } from 'react-router-dom'

export default function AdminRoute({children}) {

    const{role,roalLoading}=userRole()
       if (roalLoading)return <p>loading</p>

    const adminRole=role?.role
    console.log(role)
    console.log(adminRole)
if(adminRole!=='admin') return <Navigate to='/'></Navigate>
 if(adminRole=='admin') return children

}
