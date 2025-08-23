import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosSecure from '../hooks/useAxiosSecure'
import useTanStackQuery from '../hooks/useTanStackQuery'
import useAxiosPublick from '../hooks/useAxiosPublick'
import { useQuery } from '@tanstack/react-query'

export default function Apartment() {
  const axiosSecure = useAxiosSecure()
  const axiosPublick = useAxiosPublick()
  const { user } = useAuth()

  //pagination
  const [count, setcount] = useState(0)
  const [loading, setloading] = useState(false)
  const [currentpage, setcurrentpage] = useState(0)
  const [itemPerPage, setitemPerPage] = useState(6)
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
    queryKey: ['apartment',currentpage,itemPerPage],
    queryFn: async () => {
      const { data } = await axiosPublick.get(`/apartment?page=${currentpage}&size=${itemPerPage}`)
      return data

    }
  })

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
    const { data } = await axiosSecure.post('/agreement', agreementInfo)
    console.log(data)
  }
  return (
    <div>
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
