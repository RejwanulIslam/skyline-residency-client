import useAxiosSecure from '../../hooks/useAxiosSecure'
import useTanStackQuery from '../../hooks/useTanStackQuery'
export default function Agreement() {
    const { data, refetch } = useTanStackQuery('/agreement', 'agreement')
    const { data: userData, refetch: userRefetch } = useTanStackQuery('/user', 'user')
    const axiosSecure = useAxiosSecure()
    const acceptAgreement = async (user) => {
        console.log(user)
        const { data } = await axiosSecure.patch(`/user?useremail=${user?.email}&agreementId=${user?._id}`)
        refetch()
        console.log(data)

    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Agreement Requests</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">User Name</th>
                            <th className="py-2 px-4 border">User Email</th>
                            <th className="py-2 px-4 border">Floor No</th>
                            <th className="py-2 px-4 border">Block Name</th>
                            <th className="py-2 px-4 border">Room No</th>
                            <th className="py-2 px-4 border">Rent</th>
                            <th className="py-2 px-4 border">Request Date</th>
                            <th className="py-2 px-4 border">Status</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(item => (<tr className="hover:bg-gray-50">
                            <td className="py-2 px-4 border">{item?.name}</td>
                            <td className="py-2 px-4 border">{item?.email}</td>
                            <td className="py-2 px-4 border">{item?.floorNo}</td>
                            <td className="py-2 px-4 border">{item?.blockName}</td>
                            <td className="py-2 px-4 border">{item?.apartmentNo}</td>
                            <td className="py-2 px-4 border">${item?.rent}</td>
                            <td className="py-2 px-4 border">{item?.date}</td>
                            <td className="py-2 px-4 border">{item?.status}</td>
                            <td className="py-2 px-4 border flex space-x-2">
                                <button onClick={() => acceptAgreement(item)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Accept</button>

                                <button  disabled={item?.status === "checked"}  className="bg-red-500  text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
