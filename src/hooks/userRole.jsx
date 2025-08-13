import React, { useEffect } from 'react'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useState } from 'react'

export default function userRole() {
    const { user } = useAuth()
    const [role,setrole]=useState({})
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure.get(`/user/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setrole(res.data)
            })
    }, [user?.email])

    return role;
}
