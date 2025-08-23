import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { useState } from 'react'
import useAxiosPublick from './useAxiosPublick'

export default function userRole() {
    const { user } = useAuth()
    const [role,setrole]=useState({})
    const axiosPublick = useAxiosPublick()
    useEffect(() => {
        axiosPublick.get(`/user/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setrole(res.data)
            })
    }, [user?.email])

    return role;
}
