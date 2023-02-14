import { subscribeOrg, updateSubscriptionBillingDetails } from '@api/functions'
import { Box, Button, HStack, useToast } from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import useOrg from '@hooks/useOrg'
import { useOrgId } from '@hooks/useOrgId'
import { useStripeAppearance } from '@hooks/useStripeAppearance'
import StripeBillingDetailsForm from '@molecules/subscription/StripeBillingDetailsForm'
import StripePaymentForm from '@molecules/subscription/StripePaymentForm'
import { CustomerBillingDetails } from '@shared/model/subscription'
import { Elements } from '@stripe/react-stripe-js'
import {
  loadStripe,
  Stripe,
  StripeAddressElementChangeEvent,
  StripeElementLocale,
  StripeElements,
} from '@stripe/stripe-js'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SubscriptionSummary from './SubscriptionSummary'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

type SubscriptionPaymentStepperProps = {
  planType: Subscription_Plan_Type_Enum
}

export default function SubscriptionPaymentStepper({
  planType,
}: SubscriptionPaymentStepperProps) {
  const { t, i18n } = useTranslation()
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  })
  const orgId = useOrgId()
  const org = useOrg(orgId)
  const [stripe, setStripe] = useState<Stripe>()
  const toast = useToast()
  const currentMember = useCurrentMember()
  const [loading, setLoading] = useState(false)
  const [billingDetailsComplete, setBillingDetailsComplete] = useState(false)
  const [paymentDetailsComplete, setPaymentDetailsComplete] = useState(false)
  const [paymentElement, setPaymentElement] = useState<StripeElements>()
  const [billingDetails, setBillingDetails] = useState<CustomerBillingDetails>({
    name: org?.name,
  })
  const [promoCode, setPromoCode] = useState<string>()
  const [clientSecret, setClientSecret] = useState<string>()
  const stripeAppearance = useStripeAppearance()

  const addressDetailsChange = (event: StripeAddressElementChangeEvent) => {
    setBillingDetailsComplete(!event.complete)

    if (event.complete) {
      setBillingDetails(event.value)
    }
  }

  const updateBillingDetails = async (
    newBillingDetails: CustomerBillingDetails
  ) => {
    if (!newBillingDetails)
      throw new Error(t('SubscriptionTabs.accountTab.invalidBillingDetails'))

    await updateSubscriptionBillingDetails({
      memberId: currentMember?.id ?? '',
      orgId: orgId ?? '',
      billingDetails: newBillingDetails,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !paymentElement) {
      return
    }
    setLoading(true)

    try {
      await updateBillingDetails(billingDetails)

      const { error } = await stripe.confirmPayment({
        elements: paymentElement,
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

  const subscribe = async () => {
    setLoading(true)
    try {
      const res = await subscribeOrg({
        memberId: currentMember?.id ?? '',
        orgId: orgId ?? '',
        planType,
        promotionCode: promoCode,
      })
      setClientSecret(res.clientSecret)
      setLoading(false)
    } catch (e) {
      toast({
        title: t('common.errorRetry'),
        description: t('common.errorContact'),
        duration: 10000,
        isClosable: true,
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNext = async () => {
    if (activeStep === 1) {
      await subscribe()
      nextStep()
    } else {
      nextStep()
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
            <Elements
              stripe={stripePromise}
              options={{
                loader: 'always',
                locale: i18n.language as StripeElementLocale,
                appearance: stripeAppearance,
              }}
            >
              <StripeBillingDetailsForm
                onDetailsChanged={addressDetailsChange}
                defaultValues={{
                  name: billingDetails.name,
                  address: {
                    country: 'FR',
                  },
                }}
              />
            </Elements>
          </Box>
        </Step>

        <Step label={t('SubscriptionTabs.paymentModal.summary')}>
          {billingDetails && (
            <SubscriptionSummary
              planType={planType}
              onPromoApplied={setPromoCode}
              billingDetails={billingDetails}
            />
          )}
        </Step>

        <Step label={t('SubscriptionTabs.paymentModal.payment')}>
          <Box p="2">
            {clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  loader: 'always',
                  locale: i18n.language as StripeElementLocale,
                  appearance: stripeAppearance,
                  clientSecret,
                }}
              >
                <StripePaymentForm
                  onElementChange={setPaymentElement}
                  onStripeChange={setStripe}
                  onValidityChanged={setPaymentDetailsComplete}
                />
              </Elements>
            )}
          </Box>
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
          <Button
            isLoading={loading}
            size="sm"
            isDisabled={isNextDisabled}
            onClick={handleNext}
          >
            {t('SubscriptionTabs.paymentModal.next')}
          </Button>
        )}
        {activeStep === 2 && (
          <Button
            isLoading={loading}
            size="sm"
            isDisabled={!paymentDetailsComplete}
            type="submit"
          >
            {t('SubscriptionTabs.paymentModal.confirm')}
          </Button>
        )}
      </HStack>
    </form>
  )
}
