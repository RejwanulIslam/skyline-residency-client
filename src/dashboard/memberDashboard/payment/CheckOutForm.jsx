import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'

export default function CheckOutForm() {
  const stripe = useStripe()
  const {user}=useAuth()
  const elements = useElements()
  const [clientSecret,setClientSecret]=useState('')
  const [transationId,settransationId]=useState('')
  const [error,seterror]=useState('')
  const axiosSecure = useAxiosSecure()
  const totalPrice = 1000
  useEffect(() => {
    axiosSecure.post('/create-payment-intent',{totalPrice})
    .then(res=>{
      setClientSecret(res.data.clientSecret)
      console.log(res.data.clientSecret)
    })
  }, [axiosSecure,totalPrice])
  const handleSubmit = async (e) => {

    if(!stripe||!elements){
      return
    }
    e.preventDefault()
    const card = elements.getElement(CardElement)
     if(card==null){
      return
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if(error){
      seterror(error.message)
    }else{
      seterror('')
    }
    console.log(paymentMethod)
   

    //confarm payment
    const {paymentIntent, error:confirmerror}= await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:card,
        billing_details:{
          name:user?.displayName||'abcd',
          email:user?.email||'abcd@gmail.com'
        }
      }
      
    })
    if(confirmerror){
      console.log(confirmerror)
      seterror(confirmerror.message)
    }else{
      seterror('')
      if(paymentIntent.status="succeeded"){
       settransationId(paymentIntent.id)
      }
    }

console.log(confirmerror)
console.log(paymentIntent)
  }
  return (
    <div className='w-1/2'>
    <form onSubmit={handleSubmit}>
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
      <button className='font-semibold' type="submit" disabled={!stripe}>
        Pay
      </button>
      <p className='text-green-500'>{transationId}</p>
      <p className='text-red-500'>{error}</p>
    </form>
    </div>
  )
}
