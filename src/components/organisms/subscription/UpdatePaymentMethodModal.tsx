import { updateSubscriptionPaymentMethodIntent } from '@api/functions'
import { stripePromise } from '@api/stripe'
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
import { useOrgId } from '@hooks/useOrgId'
import { useStripeAppearance } from '@hooks/useStripeAppearance'
import { Elements } from '@stripe/react-stripe-js'
import { StripeElementLocale } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import UpdatePaymentMethodForm from './UpdatePaymentMethodForm'

type UpdatePaymentMethodModalProps = {
  onUpdate: () => void
} & Omit<ModalProps, 'children'>

export default function UpdatePaymentMethodModal({
  onUpdate,
  ...modalProps
}: UpdatePaymentMethodModalProps) {
  const { t, i18n } = useTranslation()
  const orgId = useOrgId()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const stripeAppearance = useStripeAppearance()

  const createSetupIntent = async () => {
    setLoading(true)
    try {
      const { clientSecret } = await updateSubscriptionPaymentMethodIntent({
        orgId: orgId ?? '',
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
      if (modalProps?.onClose) {
        modalProps.onClose()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    createSetupIntent()
  }, [])

  return (
    <Modal {...modalProps}>
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
              <UpdatePaymentMethodForm />
            </Elements>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
