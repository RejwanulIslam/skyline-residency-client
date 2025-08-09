import axios from 'axios'
import React from 'react'

export default function useAxiosPublick() {
    const axiosPublick = axios.create({
        baseURL:'http://localhost:5000'
    }) 
  return axiosPublick;
}
