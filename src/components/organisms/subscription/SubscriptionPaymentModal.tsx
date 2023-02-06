import { subscribeOrg } from '@api/functions'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
} from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import StripePayment from './StripePayment'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

type SubscriptionPaymentModalProps = {
  planType: Subscription_Plan_Type_Enum
} & Omit<ModalProps, 'children'>

export default function SubscriptionPaymentModal({
  planType,
  ...rest
}: SubscriptionPaymentModalProps) {
  const currentMember = useCurrentMember()
  const orgId = useOrgId()
  const [loading, setLoading] = useState<boolean>(true)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    subscribe()
  }, [])

  const subscribe = async () => {
    try {
      const res: any = await subscribeOrg({
        memberId: currentMember?.id ?? '',
        orgId: orgId ?? '',
        planType: Subscription_Plan_Type_Enum.Startup,
      })

      if (res.clientSecret) {
        setClientSecret(res.clientSecret)
      }

      setLoading(false)
    } catch (e) {
      // TODO: Display an error
      console.log('Err:', e)
    }
  }

  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{planType}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripePayment />
            </Elements>
          )}
          {loading && <Spinner m="auto" />}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={rest.onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
