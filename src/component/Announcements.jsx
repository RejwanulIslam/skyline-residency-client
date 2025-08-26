import React, { useState } from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'

export default function Announcements() {
    const [data,setdata]=useState([])
    const axiosSecure=useAxiosSecure()
    axiosSecure.get('/announcement')
    .then(res=>{
        setdata(res.data)
        console.log(res.data)})
    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
            <div className="max-w-4xl mx-auto">
                {/* Page Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
                    Announcements
                </h1>

                {/* Announcements List */}
                <div className="space-y-6">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-xl p-6 border-l-4 border-indigo-500 hover:shadow-lg transition"
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                                <span className="text-sm text-gray-500 mt-2 sm:mt-0">{item.date}</span>
                            </div>
                            <p className="mt-3 text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
