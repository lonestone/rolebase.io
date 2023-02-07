import { subscribeOrg } from '@api/functions'
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
} from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import { useStripeAppearance } from '@hooks/useStripeAppearance'
import { SubscriptionIntentResponse } from '@shared/model/subscription'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementLocale } from '@stripe/stripe-js'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SubscriptionPaymentStepper from './SubscriptionPaymentStepper'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

type SubscriptionPaymentModalProps = {
  planType: Subscription_Plan_Type_Enum
} & Omit<ModalProps, 'children'>

// TODO: Hack -- React strict mode creates 2 subscriptions because it is mounting
//               components twice
let requested = false

export default function SubscriptionPaymentModal({
  planType,
  ...rest
}: SubscriptionPaymentModalProps) {
  const { t, i18n } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const [loading, setLoading] = useState(true)
  const stripeAppearance = useStripeAppearance()
  const [subscriptionInfo, setSubscriptionInfo] =
    useState<SubscriptionIntentResponse>()

  useEffect(() => {
    subscribe()
  }, [])

  const subscribe = async () => {
    console.log('SECRET:', subscriptionInfo?.clientSecret)
    if (subscriptionInfo?.clientSecret) return

    setLoading(true)
    try {
      if (!requested) {
        requested = true
        const res = await subscribeOrg({
          memberId: currentMember?.id ?? '',
          orgId: orgId ?? '',
          planType,
        })
        console.log('RES:', res)
        setSubscriptionInfo(res)
        setLoading(false)
      }
    } catch (e) {
      // TODO: Display an error toast
      console.log('Err:', e)
    } finally {
      requested = false
      // setLoading(false)
    }
  }

  return (
    <Modal size="2xl" {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {t('SubscriptionTabs.paymentModal.subscribeToPlan', {
            plan: capitalizeFirstLetter(planType.toLocaleLowerCase()),
          })}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading && (
            <Box w="100%" pt="8" pb="14">
              <Spinner m="auto" display="block" />
            </Box>
          )}

          {subscriptionInfo?.clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                loader: 'always',
                locale: i18n.language as StripeElementLocale,
                appearance: stripeAppearance,
                clientSecret: subscriptionInfo.clientSecret,
              }}
            >
              <SubscriptionPaymentStepper
                subscriptionInfo={subscriptionInfo}
                planType={planType}
              />
            </Elements>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
