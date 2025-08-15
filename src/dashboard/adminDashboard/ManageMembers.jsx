import useAxiosSecure from '../../hooks/useAxiosSecure'
import useTanStackQuery from '../../hooks/useTanStackQuery'

export default function ManageMembers() {
    const { data, refetch } = useTanStackQuery('/user', 'user')
    const axiosSecure = useAxiosSecure()
    const member = data?.filter(user => user.role == 'member')
    console.log(data)
    console.log(member)
    const removeMember = async (email) => {
        console.log(email)
        const { data } = await axiosSecure.patch(`/user?removeMember=${email}`)
        console.log(data)
        refetch()
    }
    return (

        <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Manage Members</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Show all members in a table. Clicking <span className="font-medium">Remove</span> will (later) change role to
                        <span className="mx-1 rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">user</span> and
                        restrict access to the member dashboard.
                    </p>
                </div>

                {/* Non-functional controls (design-only) */}
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search members"
                            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 104.24 12.03l3.24 3.24a.75.75 0 101.06-1.06l-3.24-3.24A6.75 6.75 0 0010.5 3.75zm-5.25 6.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z" clipRule="evenodd" /></svg>
                        </span>
                    </div>

                </div>
            </div>

            {/* Table Card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-fixed">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="w-[40%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">User name</th>
                                <th className="w-[40%] px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">User email</th>
                                <th className="w-[20%] px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {member?.map((m, index) => (
                                <tr key={index} className="hover:bg-gray-50/60">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">

                                            <div>
                                                <div className="font-medium text-gray-800">{m.name}</div>
                                                <div className="mt-0.5 text-xs">
                                                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 ring-1 ring-emerald-100">{m.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-700">{m.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {/* Design-only Remove button (no onClick) */}
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
                                            onClick={() => removeMember(m?.email)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 109.75 9.75A9.76 9.76 0 0012 2.25zm-3 9.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z" clipRule="evenodd" /></svg>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

