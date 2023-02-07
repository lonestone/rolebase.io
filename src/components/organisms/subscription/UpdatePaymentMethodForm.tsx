import { Button, HStack, useToast } from '@chakra-ui/react'
import { useOrgId } from '@hooks/useOrgId'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import {
  StripePaymentElement,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

type UpdatePaymentMethodFormProps = {
  clientSecret: string
}

const toastDefault = { duration: 4000, isClosable: true }

export default function UpdatePaymentMethodForm({
  clientSecret,
}: UpdatePaymentMethodFormProps) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const toast = useToast()
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const onElementReady = (element: StripePaymentElement) => {
    setLoading(false)
  }

  const onCardChange = (event: StripePaymentElementChangeEvent) => {
    setDisabled(!event.complete)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)

    // TODO: change return url to settings
    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${
          new URL('', import.meta.url).origin
        }/orgs/${orgId}/subscription/complete`,
      },
    })

    if (error) {
      toast({
        title: error.message,
        status: 'error',
        ...toastDefault,
      })
    }

    setLoading(false)
    // User will be redirected to return_url
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement onChange={onCardChange} onReady={onElementReady} />
      <HStack pb="2" pt="6" justifyContent="end">
        <Button
          type="submit"
          disabled={disabled}
          isLoading={loading}
          colorScheme="orange"
        >
          {t('common.save')}
        </Button>
      </HStack>
    </form>
  )
}