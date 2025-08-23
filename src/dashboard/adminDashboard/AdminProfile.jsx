import React from 'react'
import useAuth from '../../hooks/useAuth'
import useTanStackQuery from '../../hooks/useTanStackQuery'

export default function AdminProfile() {
    const { user } = useAuth()
    const { data: totalRooms } = useTanStackQuery('/apartmentCount', 'apartmentCount')
    const { data: bookingRooms } = useTanStackQuery('/agreementCount', 'agreementCount')
    const { data: totaluser } = useTanStackQuery('/user', 'user')
    const totalMember=totaluser.filter(member=>member.role=='member')
    if (!totalRooms || !bookingRooms) return <p>Loading...</p>
    const unavailableRooms = parseInt((bookingRooms * 100) / totalRooms.result)
    const ailableRooms = parseInt(((totalRooms.result-bookingRooms)*100)/totalRooms.result)
    console.log('unavailableRooms', unavailableRooms)
    return (
        <div>
            <div className="p-6 min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="w-full max-w-4xl shadow-xl rounded-2xl bg-white p-8">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={user?.photoURL}
                            alt="Admin"
                            className="w-32 h-32 rounded-full border-4 border-indigo-500"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Admin Name</h2>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-indigo-50 rounded-xl p-6 text-center shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700">Total Rooms</h3>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">{totalRooms?.result}</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-6 text-center shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700">Available Rooms</h3>
                            <p className="text-3xl font-bold text-green-600 mt-2">{ailableRooms}%</p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-6 text-center shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700">Unavailable Rooms</h3>
                            <p className="text-3xl font-bold text-red-600 mt-2">{unavailableRooms}%</p>
                        </div>
                    </div>

                    {/* Users / Members */}
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 rounded-xl p-6 text-center shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                            <p className="text-3xl font-bold text-blue-600 mt-2">{totaluser?.length}</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-6 text-center shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700">Total Members</h3>
                            <p className="text-3xl font-bold text-purple-600 mt-2">{totalMember?.length}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

