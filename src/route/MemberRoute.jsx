import React from 'react'
import userRole from '../hooks/userRole'
import { Navigate } from 'react-router-dom'

export default function MemberRoute({children}) {

    const { role, roalLoading } = userRole()
    if (roalLoading) return <p>loading</p>

    const memberRole = role?.role

    if (memberRole == 'member') return children
    if (memberRole !== 'member') return <Navigate to='/'></Navigate>
}
