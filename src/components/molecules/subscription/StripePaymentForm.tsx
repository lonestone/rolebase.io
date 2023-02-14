import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import {
  StripeElements,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js'
import React, { useEffect } from 'react'

type StripePaymentFormProps = {
  onValidityChanged: (valid: boolean) => void
  onElementChange: (elements: StripeElements) => void
  onStripeChange: (stripe) => void
}

export default function StripePaymentForm({
  onElementChange,
  onStripeChange,
  onValidityChanged,
}: StripePaymentFormProps) {
  const elements = useElements()
  const stripe = useStripe()

  const paymentDetailsChange = (event: StripePaymentElementChangeEvent) => {
    onValidityChanged(event.complete)
  }

  useEffect(() => {
    if (elements) {
      onElementChange(elements)
    }
  }, [elements])

  useEffect(() => {
    if (stripe) {
      onStripeChange(stripe)
    }
  }, [stripe])

  return <PaymentElement onChange={paymentDetailsChange} />
}
