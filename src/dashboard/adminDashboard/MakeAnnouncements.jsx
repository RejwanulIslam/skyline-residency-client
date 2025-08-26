import React from 'react'
import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../hooks/useAxiosSecure'

export default function MakeAnnouncements() {
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        //console.log(data)
        const announcementsData = {
            title: data?.title,
            description: data?.description,
            date:new Date()
        }
        const { data:announcement } = await axiosSecure.post('/announcement', announcementsData)
        console.log(announcement)
    }
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Create Announcement
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            {...register('title')}
                            placeholder="Enter title"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Write your announcement..."
                            {...register('description')}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                    </div>

                    {/* Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
                        >
                            Post Announcement
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
