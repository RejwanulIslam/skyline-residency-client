import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import CheckOutForm from './CheckOutForm'

const stripePromise=loadStripe(import.meta.env.VITE_STIPE_PUBLISHABLE_KEY)
export default function Payment() {

  return (
    <Elements stripe={stripePromise}>
        <CheckOutForm></CheckOutForm>
    </Elements>
  )
}

