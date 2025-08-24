import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import useTanStackQuery from '../../../hooks/useTanStackQuery'

export default function CheckOutForm() {
  const stripe = useStripe()
  const { user, seletMonth,directCuppon } = useAuth()

  console.log(seletMonth)
  const elements = useElements()
  const axiosSecure = useAxiosSecure()

  const [clientSecret, setClientSecret] = useState('')
  const [transationId, settransationId] = useState('')
  const [error, seterror] = useState('')
  const [cupponCode, setcupponCode] = useState('')
  const [cupponMassage, setcupponMassage] = useState('')
  const [totalPrice, settotalPrice] = useState(0)
  const [cuppon, setcuppon] = useState(0)

  const { data: cupponData, refetch } = useTanStackQuery('/cuppon', 'cuppon')
  console.log(cupponData)
  console.log(cupponCode)
  const chackCuppon = () => {
    setcuppon(0)
    setcupponMassage('')
    const findCuppon =  cupponData.find(item => item.cupponCode == cupponCode)
      console.log(findCuppon)

    if (findCuppon) {
      setcuppon(findCuppon?.discountPercentage)
    setcupponMassage(`Congatulation You Discount${parseInt(findCuppon?.discountPercentage)}% `)

    }
   if (!findCuppon){
    setcupponMassage('Your Cuppon is Invalid')

    }

  }
  console.log(cuppon)


  const { data } = useTanStackQuery('/agreement', 'agreement')
  const agreementData = data?.find(data => data?.email == user?.email)
  console.log(agreementData)
    useEffect(()=>{
      setcupponCode(directCuppon)
    },[directCuppon])
  
  useEffect(() => {
    if (cuppon) {
      const discount = agreementData?.rent * parseInt(cuppon) / 100
      const Price = agreementData?.rent - discount
      settotalPrice(Price)

    }
    if (!cuppon) {
      const Price = agreementData?.rent
      settotalPrice(Price)
    }

  }, [cuppon, agreementData])

  console.log(totalPrice)



  useEffect(() => {
   if(totalPrice>0){ axiosSecure.post('/create-payment-intent', {totalPrice})
      .then(res => {
        setClientSecret(res.data.clientSecret)
        console.log(res.data.clientSecret)
      })
}}, [axiosSecure, totalPrice])
  const handleSubmit = async (e) => {

    if (!stripe || !elements) {
      return
    }
    e.preventDefault()
    const card = elements.getElement(CardElement)
    if (card == null) {
      return
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if (error) {
      seterror(error.message)
    } else {
      seterror('')
    }
    console.log(paymentMethod)


    //confarm payment
    const { paymentIntent, error: confirmerror } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'abcd',
          email: user?.email || 'abcd@gmail.com'
        }
      }

    })
    if (confirmerror) {
      console.log(confirmerror)
      seterror(confirmerror.message)
    } else {
      seterror('')
      if (paymentIntent.status == "succeeded") {
        settransationId(paymentIntent.id)
        const paymentData = {
          user_Email: user?.email,
          month: seletMonth,
          floor_No: agreementData?.floorNo,
          block_Name: agreementData?.blockName,
          apartment_No: agreementData?.apartmentNo,
          rent: totalPrice,
          transation_Id: paymentIntent?.id,
          date: new Date()

        }
        console.log(paymentData)
        const { data } = await axiosSecure.post('/paymentHistory', paymentData)
        console.log(data)
      }
    }

    console.log(confirmerror)
    console.log(paymentIntent)
  }
  return (
    <div className=''>

      <form onSubmit={handleSubmit}>
        <div className='flex gap-3'>
          <div className='w-[300px]'>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          <div className='w-5'>
            <button className='btn bg-green-400 font-bold' type="submit" disabled={!stripe}>
              Pay
            </button>
          </div>

        </div>

      </form>
     {
      directCuppon ===''?<><input type="text" onChange={(e) => setcupponCode(e.target.value)} placeholder="Type here" className="input input-bordered input-xs w-full max-w-xs flex text-left" />
      <button onClick={() => { chackCuppon() }}>Apply</button></>

      :
      <>
      <input type="text" value={directCuppon}    placeholder="Type here" className="input input-bordered input-xs w-full max-w-xs flex text-left" />
      <button onClick={() => { chackCuppon()}}>Apply</button>
     </>
     }
      
     
      <p>{cupponMassage}</p>

      {transationId && <p className='text-green-500 text-left'> <span className='font-semibold text-black'>transationId:</span> {transationId}</p>}
      <p className='text-red-500 text-left'>{error}</p>
    </div>
  )
}
