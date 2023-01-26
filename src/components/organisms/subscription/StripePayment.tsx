import { useOrgId } from '@hooks/useOrgId'
import React, { FormEvent } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

export default function StripePayment() {
  const orgId = useOrgId()
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${
          new URL('', import.meta.url).origin
        }/orgs/${orgId}/subscription/complete`,
      },
    })

    if (result.error) {
      // TODO: Toast
      console.log(result.error.message)
    } else {
      // Case when customer is redirected to another app (Waiting for payment confirmation)
      // TODO: Display waiting toast state ?
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button>Submit</button>
    </form>
  )
}
