import useTanStackQuery from '../hooks/useTanStackQuery'

export default function Apartment() {
    const data= useTanStackQuery('/apartment','apartment')
    console.log(data)
  return (
    <div className='grid grid-cols-2 gap-5 '>
        {
            data?.map(apartment=>(<div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
          Agreement
        </button>
      </div>
    </div>))
        }
    </div>
  )
}
