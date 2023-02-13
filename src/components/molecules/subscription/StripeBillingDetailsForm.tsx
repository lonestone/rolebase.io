import { CustomerBillingDetails } from '@shared/model/subscription'
import { AddressElement } from '@stripe/react-stripe-js'
import { StripeAddressElementChangeEvent } from '@stripe/stripe-js'
import React from 'react'

type StripeBillingDetailsFormProps = {
  defaultValues: CustomerBillingDetails | null
  onDetailsChanged: (event: StripeAddressElementChangeEvent) => void
}

export default function StripeBillingDetailsForm({
  defaultValues,
  onDetailsChanged,
}: StripeBillingDetailsFormProps) {
  return (
    <AddressElement
      onChange={onDetailsChanged}
      options={{
        mode: 'billing',
        defaultValues: { ...defaultValues },
      }}
    />
  )
}
