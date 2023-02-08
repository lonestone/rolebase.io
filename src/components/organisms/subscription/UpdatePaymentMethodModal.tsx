import { updateSubscriptionPaymentMethodIntent } from '@api/functions'
import ModalCloseStaticButton from '@atoms/ModalCloseStaticButton'
import {
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import { useStripeAppearance } from '@hooks/useStripeAppearance'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementLocale } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UpdatePaymentMethodForm from './UpdatePaymentMethodForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

type UpdatePaymentMethodModalProps = {
  onUpdate: () => void
} & Omit<ModalProps, 'children'>

export default function UpdatePaymentMethodModal({
  onUpdate,
  ...rest
}: UpdatePaymentMethodModalProps) {
  const { t, i18n } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const stripeAppearance = useStripeAppearance()

  const createSetupIntent = async () => {
    setLoading(true)
    try {
      const { clientSecret } = await updateSubscriptionPaymentMethodIntent({
        orgId: orgId ?? '',
        memberId: currentMember?.id ?? '',
      })

      setClientSecret(clientSecret)
    } catch (e) {
      toast({
        title: t('common.errorRetry'),
        description: t('common.errorContact'),
        status: 'error',
        duration: 10000,
        isClosable: true,
      })
      if (rest?.onClose) {
        rest.onClose()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    createSetupIntent()
  }, [])

  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack justifyContent="space-between">
            <Text>{t('SubscriptionTabs.accountTab.updateBillingDetails')}</Text>
            <ModalCloseStaticButton />
          </HStack>
        </ModalHeader>
        <ModalBody>
          {loading && (
            <HStack w="100%" mb="10" justifyContent="center">
              <Spinner />
            </HStack>
          )}
          {!loading && clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                locale: i18n.language as StripeElementLocale,
                clientSecret,
                appearance: stripeAppearance,
              }}
            >
              <UpdatePaymentMethodForm clientSecret={clientSecret} />
            </Elements>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
