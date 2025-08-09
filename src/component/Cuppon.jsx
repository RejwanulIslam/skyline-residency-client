import useTanStackQuery from '../hooks/useTanStackQuery'

export default function Cuppon() {

    const data = useTanStackQuery('/cuppon', 'cuppon')
    console.log(data)
    return (
        <div className='grid grid-cols-3 gap-5'>
            {
                data?.map(coupon => (
                    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
                            <h2 className="text-xl font-bold">{coupon.title}</h2>
                            <p className="text-sm">{coupon.building}</p>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-4">
                            {/* Coupon Code */}
                            <div className="text-center">
                                <span className="block text-gray-500 text-sm mb-4">Coupon Code</span>
                                <span className="text-2xl font-mono font-bold tracking-widest bg-gray-100 px-4 py-2 rounded-md border border-dashed border-gray-400">
                                    {coupon.code}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 text-sm">
                                {coupon.description}
                            </p>

                            {/* Discount & Type */}
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-indigo-600">
                                    Discount: {coupon.discount}
                                </span>
                                <span className="text-gray-500">Type: {coupon.type}</span>
                            </div>

                            {/* Expiry */}
                            <div className="text-red-500 text-xs">
                                Expires: {new Date(coupon.expiry).toLocaleDateString()}
                            </div>

                            {/* Terms */}
                            <p className="text-xs text-gray-400 italic">
                                {coupon.terms}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-center">
                            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow">
                                Redeem Now
                            </button>
                        </div>
                    </div>

                ))
            }
        </div>
    )
}
