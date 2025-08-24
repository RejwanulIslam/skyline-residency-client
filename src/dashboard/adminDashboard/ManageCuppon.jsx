import { useState } from "react"
import useTanStackQuery from "../../hooks/useTanStackQuery"
import useAxiosSecure from "../../hooks/useAxiosSecure"

export default function ManageCuppon() {
    const axiosSecure = useAxiosSecure()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [type, setType] = useState('')
    const [cupponDescription, setCupponDescription] = useState('')
    console.log(cupponDescription)

    const { data,refetch } = useTanStackQuery('/cuppon', 'cuppon')
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const cupponCode = form.couponCode.value
        const discountPercentage = form.discountPercentage.value
        const description = form.description.value
        console.log({ cupponCode, discountPercentage, type, description })
        const cupponData = { cupponCode, discountPercentage, description, type }
        axiosSecure.post('/cuppon', cupponData)
            .then(res => console.log(res.data))
    }

        const handleUpdate=async(id)=>{
            console.log(id)
        }
        const handleDelete=async(id)=>{
           const {data}=await axiosSecure.delete(`/cuppon/${id}`) 
           console.log(data)
           refetch()
        }

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Coupon Management
                    </h1>
                    <button
                        className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Coupon
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Coupon Code
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Discount (%)
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.map((coupon) => (
                                <tr key={coupon.id}>
                                    {() => setCupponDescription(coupon.description)}
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                                        {coupon.cupponCode}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                                        {coupon.discountPercentage}%
                                    </td>
                                    <td className="px-4  sm:px-6 py-4  text-sm sm:text-base text-gray-500">
                                        {(coupon.description).slice(0, 31)}{(cupponDescription).slice(31)}  {cupponDescription == '' ? <button onClick={() => setCupponDescription(coupon.description)} className="text-red-500">read...</button> :
                                            <button onClick={() => setCupponDescription('')} className="text-red-500">short</button>}
                                    </td>
                                    <td className="flex gap-4 px-4  sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base ">
                                        {/* <button onClick={()=>handleUpdate(coupon?._id)} className="btn btn-accent">Update</button> */}
                                        <button onClick={()=>handleDelete(coupon?._id)} className="btn btn-error text-2xl">X</button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <form onSubmit={handleSubmit}>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-0">

                        <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4 sm:mx-0">
                            <h2 className="text-xl font-bold mb-4">Add New Coupon</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Coupon Code
                                    </label>
                                    <input
                                        type="text"
                                        name="couponCode"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Enter coupon code"
                                    />
                                </div>
                                <div className="flex md:gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Discount Percentage
                                        </label>
                                        <input
                                            type="number"
                                            name="discountPercentage"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            placeholder="Enter discount percentage"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Cuppon Type
                                        </label>
                                        <select onChange={(e) => setType(e.target.value)} className="select select-bordered select-xs">
                                            <option disabled selected>Type</option>
                                            <option>HOT</option>
                                            <option>NEW</option>
                                            <option>TRENDING</option>

                                        </select>
                                    </div>
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Coupon Description
                                    </label>
                                    <textarea
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        name="description"
                                        placeholder="Enter coupon description"
                                        rows="4"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2">

                                <button
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    Submit
                                </button>
                            </div>
                        </div>

                    </div>
                </form>
            )}
        </div>
    )
}

