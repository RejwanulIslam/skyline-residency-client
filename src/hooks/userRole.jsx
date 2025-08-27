import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { useState } from 'react'
import useAxiosPublick from './useAxiosPublick'

export default function userRole() {
    const { user } = useAuth()
    const [roalLoading, setroalLoading] = useState(true)
    const [role, setrole] = useState({})
    const axiosPublick = useAxiosPublick()
    console.log(role)
    useEffect(() => {
        if(!user?.email)return
        setroalLoading(true)
        console.log(user?.email)
        axiosPublick.get(`/userRole?email=${user?.email}`)
            .then(res => {
                console.log(res.data)
                setrole(res.data)
            })
            .finally(() => {
                setroalLoading(false)
            })
    }, [user?.email])
 
    return { role, roalLoading };
}
