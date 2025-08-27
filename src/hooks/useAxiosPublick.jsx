import axios from 'axios'
import React from 'react'

export default function useAxiosPublick() {
    const axiosPublick = axios.create({
        baseURL:'https://skyline-residency-server.vercel.app'
    }) 
  return axiosPublick;
}
