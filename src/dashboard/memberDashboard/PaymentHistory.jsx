import React from 'react'
import useTanStackQuery from '../../hooks/useTanStackQuery'

export default function PaymentHistory() {
    const { data } = useTanStackQuery('/paymentHistory', 'paymentHistory')
    console.log(data)
    return (

        <div className="p-6 bg-gray-50 min-h-screen overflow-x-hidden">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Payment History
            </h2>

            <div className="overflow-x-auto max-w-4xl overflow-hidden bg-white rounded-2xl shadow-md">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-100 text-gray-700 sticky top-0">
                        <tr>
                            <th className="p-3 text-left border-b">Apartment No</th>
                            <th className="p-3 text-left border-b">Block</th>
                            <th className="p-3 text-left border-b">Floor</th>
                            <th className="p-3 text-left border-b">Month</th>
                            <th className="p-3 text-left border-b">Rent</th>
                            <th className="p-3 text-left border-b">Transaction ID</th>
                            <th className="p-3 text-left border-b">Email</th>
                            <th className="p-3 text-left border-b">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(item=>  <tr className="hover:bg-gray-50">
                            <td className="p-3 border-b">{item?.apartment_No}</td>
                            <td className="p-3 border-b">{item?.block_Name}</td>
                            <td className="p-3 border-b">{item?.floor_No}</td>
                            <td className="p-3 border-b">{item?.month}</td>
                            <td className="p-3 border-b">{item?.rent}</td>
                            <td className="p-3 border-b">{item?.transation_Id}</td>
                            <td className="p-3 border-b">{item?.user_Email}</td>
                            <td className="p-3 border-b">{item?.date}</td>
                        </tr>)
                        }
                      

                
                    </tbody>
                </table>
            </div>
        </div>


    )
}
