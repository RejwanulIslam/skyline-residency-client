import React from 'react'
import useAuth from '../../hooks/useAuth'

export default function UserProfile() {
    const {user}=useAuth()
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
            <div className="bg-white shadow-lg rounded-2xl max-w-lg w-full p-6 sm:p-10">
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                    <img
                        src={user?.photoURL}
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md"
                    />
                    <h2 className="mt-4 text-2xl font-bold text-gray-800">{user?.displayName}</h2>
                    <p className="text-gray-500 text-sm sm:text-base">{user?.email}</p>
                </div>

                {/* Divider */}
                <div className="my-6 border-b border-gray-200"></div>

                {/* User Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                    <div>
                        <p className="text-sm text-gray-500">Agreement Accept Date</p>
                        <p className="font-semibold">None</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Floor</p>
                        <p className="font-semibold">None</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Block</p>
                        <p className="font-semibold">None</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Room No</p>
                        <p className="font-semibold">None</p>
                    </div>
                </div>

                {/* Button */}
                <div className="mt-8 flex justify-center">
                    <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    )
}
