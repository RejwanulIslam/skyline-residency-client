import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useAxiosSecure from '../hooks/useAxiosSecure'
import useTanStackQuery from '../hooks/useTanStackQuery'

export default function Cuppon() {
    const {directCuppon, setDirectCuppon}=useAuth()
    const { data, refetch } = useTanStackQuery('/cuppon', 'cuppon')
    console.log(data)
    const hotCuppon = data?.filter(item => item.type == 'HOT')
    const newCuppon = data?.filter(item => item.type == 'NEW')
    const trendingCuppon = data?.filter(item => item.type == 'TRENDING')
    console.log(hotCuppon)
    const handleallCuppon=(code)=>{
       setDirectCuppon(code)
       console.log(code)
    }

    return (
        <div class="bg-gray-100 min-h-screen p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Exclusive Coupons</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                  hotCuppon?.map(item=>  <div class="bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 relative border-t-4 border-blue-500">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold text-gray-800">{item?.cupponCode}</h3>
                            <span class="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">{item?.discountPercentage}% OFF</span>
                        </div>
                        <p class="text-gray-600 mb-4">{item?.description}</p>
                       <Link to="/memberDashboard/makePayment"> <button onClick={()=>handleallCuppon(item?.cupponCode)} class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full">
                            Redeem Now
                        </button>
                        </Link>
                        <span class="absolute -top-3 -right-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">HOT</span>
                    </div>
                  )
                }
                {/* Coupon Card */}


                {/* Coupon Card  */}
                {
                    newCuppon?.map(item=> <div class="bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 relative border-t-4 border-green-500">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">{item?.cupponCode}</h3>
                        <span class="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">{item?.discountPercentage}% OFF</span>
                    </div>
                    <p class="text-gray-600 mb-4">{item?.description}</p>
                  <Link to="/memberDashboard/makePayment">  <button  onClick={()=>handleallCuppon(item?.cupponCode)} class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full">
                        Redeem Now
                    </button></Link>
                    <span class="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">NEW</span>
                </div>)
                }
               

                {/*  Coupon Card */}
                {
                    trendingCuppon?.map(item=><div class="bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 relative border-t-4 border-pink-500">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">{item?.cupponCode}</h3>
                        <span class="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">{item?.discountPercentage}% OFF</span>
                    </div>
                    <p class="text-gray-600 mb-4">{item?.description}</p>
                   <Link  to="/memberDashboard/makePayment"> <button  onClick={()=>handleallCuppon(item?.cupponCode)} class="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors w-full">
                        Redeem Now
                    </button></Link>
                    <span class="absolute -top-3 -right-3 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">TRENDING</span>
                </div>)
                }
                
            </div>
        </div>

    )
}
