import React from 'react'
import useTanStackQuery from '../../hooks/useTanStackQuery'
import useAuth from '../../hooks/useAuth'

export default function MemberProfile() {
    const { data,isPending } = useTanStackQuery('/agreement', 'agreement')
    
    if(isPending)return <p>Loding</p>
    const { user } = useAuth()
    const RentedApartment = data?.find(apartment => apartment?.email == user?.email)
    console.log(RentedApartment)
    console.log(data)
    console.log(user)
    const { _id,name,email,floorNo,blockName,apartmentNo,rent,date,status }=RentedApartment
    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center gap-6 border-b pb-6 mb-6">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-400">
                        Agreement Accepted:{" "}
                        <span className="text-indigo-500 font-medium">
                            {date}
                        </span>
                    </p>
                </div>
            </div>

            {/* Apartment Info */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Rented Apartment Info
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-indigo-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Floor</p>
                        <p className="text-lg font-bold text-gray-800">
                            {floorNo}
                        </p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Block</p>
                        <p className="text-lg font-bold text-gray-800">
                            {blockName}
                        </p>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Room No</p>
                        <p className="text-lg font-bold text-gray-800">
                            {apartmentNo}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
