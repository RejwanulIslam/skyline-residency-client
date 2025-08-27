import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosSecure from '../hooks/useAxiosSecure'
import useTanStackQuery from '../hooks/useTanStackQuery'
import useAxiosPublick from '../hooks/useAxiosPublick'
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'

export default function Apartment() {
  const axiosSecure = useAxiosSecure()
  const axiosPublick = useAxiosPublick()
  const { user } = useAuth()

  //pagination
  const [count, setcount] = useState(0)
  const [minRent, setMinRent] = useState('')
  const [maxRent, setMaxRent] = useState('')
  const [loading, setloading] = useState(false)
  const [currentpage, setcurrentpage] = useState(0)
  const [itemPerPage, setitemPerPage] = useState(6)
  const [allData, setAllData] = useState([])
  const { data: apartmentCount } = useTanStackQuery('/apartmentCount', 'apartmentCount')
  useEffect(() => {
    if (apartmentCount) {
      setcount(apartmentCount?.result)
    }
  }, [apartmentCount])
  console.log(count)


  const numbetOfPaje = Math.ceil(count / itemPerPage)
  console.log(numbetOfPaje)
  const pages = [...Array(numbetOfPaje).keys()]




  const { data, isLoading } = useQuery({
    queryKey: ['apartment', currentpage, itemPerPage, minRent, maxRent],
    queryFn: async () => {
      const { data } = await axiosPublick.get(`/apartment?page=${currentpage}&size=${itemPerPage}&minRent=${minRent}&maxRent=${maxRent}`)

      return data

    }
  })
  // useEffect(()=>{
  //   if(data){
  //   setAllData(data)

  //   }
  // },[data])

  const handleItemPerPage = (num) => {
    setitemPerPage(num)
    setcurrentpage(0)
  }

  const handlePrevPage = () => {
    if (currentpage > 0) {
      setcurrentpage(currentpage - 1)
    }
  }
  const handleNextPage = () => {
    if (currentpage < pages.length - 1) {
      setcurrentpage(currentpage + 1)
    }
  }


  const agreementData = async (apartment) => {
    const { floorNo, blockName, apartmentNo, rent } = apartment
    const agreementInfo = {
      name: user?.displayName,
      email: user?.email,
      floorNo, blockName,
      apartmentNo,
      rent,
      date: new Date(),
      status: 'pending'
    }
    console.log(agreementInfo)
    if (user) {
      const { data } = await axiosSecure.post('/agreement', agreementInfo)
      console.log(data)
      if (data?.acknowledged) {
        Swal.fire({
          title: "Agreement request Successfull",
          icon: "success",
          draggable: true
        })
      }
    }

  }

  // search
  // const handleSearch = async () => {
  //   const { data } = await axiosPublick.get(`/apartment?minRent=${minRent}&maxRent=${maxRent}`)
  //   console.log(data)
  //   setAllData(data)
  // }
  console.log(minRent, maxRent)

  return (
    <div>
      <div className="p-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {/* Search Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Search Apartments by Rent
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-4 sm:space-y-0">
              {/* Min Rent */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Min Rent (TK)
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  value={minRent}
                  onChange={(e) => setMinRent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Max Rent */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Max Rent (TK)
                </label>
                <input
                  type="number"
                  placeholder="2000"
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Search Button */}
              <div>
                {/* <button  className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
                  Search
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='grid lg:grid-cols-2 gap-5 '>
        {
          isLoading ? <p>loading</p> : data?.map(apartment => (<div key={apartment?._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src={apartment.image}
              alt={`Apartment ${apartment.apartmentNo}`}
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">Apartment {apartment.apartmentNo}</h2>
              <p className="text-gray-600 mt-2">Block: {apartment.blockName}</p>
              <p className="text-gray-600">Floor: {apartment.floorNo}</p>
              <p className="text-gray-600">Rent: ৳{apartment.rent.toLocaleString()}/month</p>
              <button onClick={() => agreementData(apartment)} className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                Agreement
              </button>
            </div>
          </div>))
        }


      </div>
      <div className='flex gap-5'>
        <button onClick={handlePrevPage} className='btn btn-sm'>Prev</button>
        {
          pages.map(item => <button onClick={() => setcurrentpage(item)} className={`btn btn-sm ${currentpage == item && 'bg-green-500'}`}>{item + 1}</button>)
        }
        <button onClick={handleNextPage} className='btn btn-sm'>Next</button>

        <select onChange={(e) => handleItemPerPage(parseInt(e.target.value))} className="select select-bordered select-xs  max-w-xs">
          <option disabled selected>Tiny</option>
          <option>6</option>
          <option>10</option>
          <option>15</option>
        </select>
      </div>
    </div>
  )
}
