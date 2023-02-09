import { updateSubscriptionBillingDetails } from '@api/functions'
import { Box, Button, HStack, useToast } from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import useOrg from '@hooks/useOrg'
import { useOrgId } from '@hooks/useOrgId'
import {
  CustomerBillingDetails,
  SubscriptionIntentResponse,
} from '@shared/model/subscription'
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import {
  StripeAddressElementChangeEvent,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useCurrentMember from '../../../hooks/useCurrentMember'
import SubscriptionSummary from './SubscriptionSummary'

type SubscriptionPaymentStepperProps = {
  planType: Subscription_Plan_Type_Enum
  subscriptionInfo: SubscriptionIntentResponse
}

export default function SubscriptionPaymentStepper({
  planType,
  subscriptionInfo,
}: SubscriptionPaymentStepperProps) {
  const { t } = useTranslation()
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  })
  const orgId = useOrgId()
  const org = useOrg(orgId)
  const stripe = useStripe()
  const elements = useElements()
  const toast = useToast()
  const currentMember = useCurrentMember()
  const [loading, setLoading] = useState(false)
  const [billingDetailsComplete, setBillingDetailsComplete] = useState(false)
  const [paymentDetailsComplete, setPaymentDetailsComplete] = useState(false)
  const [billingDetails, setBillingDetails] = useState<CustomerBillingDetails>({
    name: org?.name,
  })

  const addressDetailsChange = (event: StripeAddressElementChangeEvent) => {
    setBillingDetailsComplete(!event.complete)

    if (event.complete) {
      setBillingDetails(event.value)
    }
  }

  const paymentDetailsChange = (event: StripePaymentElementChangeEvent) => {
    setPaymentDetailsComplete(!event.complete)
  }

  const updateBillingDetails = async (
    newBillingDetails: CustomerBillingDetails
  ) => {
    // TODO: translate
    if (!billingDetails) throw new Error('No billing details')

    await updateSubscriptionBillingDetails({
      memberId: currentMember?.id ?? '',
      orgId: orgId ?? '',
      billingDetails: newBillingDetails,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setLoading(true)

    try {
      await updateBillingDetails(billingDetails)

      // TODO: change return url to settings
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${
            new URL('', import.meta.url).origin
          }/orgs/${orgId}/subscription`,
        },
      })

      if (error) throw error
    } catch (e: any) {
      toast({
        title: e.message,
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const isNextDisabled = useMemo(() => {
    if (activeStep === 0) return billingDetailsComplete
    if (activeStep === 1) return paymentDetailsComplete

    return false
  }, [activeStep, billingDetailsComplete, paymentDetailsComplete])

  return (
    <form onSubmit={handleSubmit}>
      <Steps
        colorScheme="orange"
        orientation="vertical"
        activeStep={activeStep}
      >
        <Step label={t('SubscriptionTabs.paymentModal.details')}>
          <Box p="2">
            <AddressElement
              onChange={addressDetailsChange}
              options={{
                mode: 'billing',
                defaultValues: {
                  name: billingDetails.name,
                  address: {
                    country: 'FR',
                  },
                },
              }}
            />
          </Box>
        </Step>

        <Step label={t('SubscriptionTabs.paymentModal.payment')}>
          <Box p="2">
            <PaymentElement onChange={paymentDetailsChange} />
          </Box>
        </Step>

        <Step label={t('SubscriptionTabs.paymentModal.summary')}>
          {billingDetails && subscriptionInfo && (
            <SubscriptionSummary
              planType={planType}
              billingDetails={billingDetails}
              subscriptionInfo={subscriptionInfo}
            />
          )}
        </Step>
      </Steps>
      <HStack paddingY="2" w="100%" justifyContent="end">
        <Button
          isDisabled={activeStep === 0}
          mr={4}
          onClick={prevStep}
          size="sm"
          variant="ghost"
        >
          {t('SubscriptionTabs.paymentModal.prev')}
        </Button>
        {activeStep < 2 && (
          <Button size="sm" isDisabled={isNextDisabled} onClick={nextStep}>
            {t('SubscriptionTabs.paymentModal.next')}
          </Button>
        )}
        {activeStep === 2 && (
          <Button
            isLoading={loading}
            size="sm"
            isDisabled={billingDetailsComplete || paymentDetailsComplete}
            type="submit"
          >
            {t('SubscriptionTabs.paymentModal.confirm')}
          </Button>
        )}
      </HStack>
    </form>
  )
}
