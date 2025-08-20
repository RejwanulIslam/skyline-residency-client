import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTanStackQuery from "../../hooks/useTanStackQuery"
import {useContext, useState } from "react"
export default function MakePayment() {
    const {user,seletMonth,setseletMonth,}=useAuth()
    console.log(seletMonth)
        if(!user)return <p>Loding...</p>
    const {data}=useTanStackQuery('/agreement','agreement')

    const agreementData=data?.find(data=>data?.email==user?.email)
    const {apartmentNo,blockName,date,email,floorNo,name,rent,status,_id}=agreementData||{}

    console.log(agreementData)
   
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Rent Payment Form</h2>

            <form className="space-y-4">
                <div className="flex gap-5">
                {/* Member Email */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Member Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        readOnly
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Floor */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Floor</label>
                    <input
                        type="text"
                        value={floorNo}
                        readOnly
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>
                </div>
                     <div className="flex gap-5">
                {/* Block Name */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Block Name
                    </label>
                    <input
                        type="text"
                        value={blockName}
                        readOnly
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                
                {/* Apartment / Room No */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Apartment/Room No
                    </label>
                    <input
                        type="text"
                        value={apartmentNo}
                        readOnly
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>
                </div>
               <div>
                <div className="flex gap-5">
                {/* Rent */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Rent</label>
                    <input
                        type="text"
                        value={rent}
                        readOnly
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Month Selection */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Month</label>
                    <select onChange={(e)=>setseletMonth(e.target.value)}  className="w-full border rounded-lg px-3 py-2">
                        <option>Select Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                    </select>
                </div>
                </div>
                </div>

            </form>
           <Link to="/memberDashboard/payment"> <button className="btn font-bold bg-green-500 mt-5">Pay</button></Link>
        

       </div>

    )
}
