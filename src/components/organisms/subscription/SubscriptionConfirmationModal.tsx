import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalProps,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useStripe } from '@stripe/react-stripe-js'
import { PaymentIntent } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type SubscriptionConfirmationModalProps = {
  clientSecret: string
} & Omit<ModalProps, 'children'>

// TODO: define if only modal or only toast
export default function SubscriptionConfirmationModal({
  clientSecret,
  ...modalProps
}: SubscriptionConfirmationModalProps) {
  const { t } = useTranslation()
  const stripe = useStripe()
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [retrievedPaymentIntent, setRetrievedPaymentIntent] =
    useState<PaymentIntent>()

  const retrievePaymentIntent = async (secret: string) => {
    if (!stripe) return

    setLoading(true)
    const { paymentIntent, error } = await stripe.retrievePaymentIntent(
      clientSecret
    )

    if (error) {
      toast({
        title: t('common.errorOccurred'),
        status: 'error',
      })
      setError(error.message)
    } else {
      setRetrievedPaymentIntent(paymentIntent)

      if (paymentIntent.status === 'succeeded') {
        toast({
          title: t('SubscriptionPlans.subscriptionSuccess'),
          description: t('SubscriptionPlans.subscriptionCreated'),
          status: 'success',
        })
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    if (clientSecret && stripe) {
      retrievePaymentIntent(clientSecret)
    }
  }, [clientSecret, stripe])

  return (
    <Modal size="2xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody mt="8">
          {loading && (
            <Box w="100%" pt="8" pb="14">
              <Spinner m="auto" display="block" />
            </Box>
          )}
          {!error && retrievedPaymentIntent && (
            <>
              <Text
                textAlign="center"
                m="auto"
                fontWeight={700}
                fontSize="24"
                color="gray.600"
                _dark={{
                  color: 'gray.300',
                }}
                mb="2"
              >
                {t('SubscriptionPlans.subscriptionSuccess')}
              </Text>
              <Text mt="6" fontWeight={600} fontSize="16">
                {t('SubscriptionPlans.subscriptionCreated')}
              </Text>
              <Text mt="2" fontWeight={600} fontSize="16">
                {t('SubscriptionPlans.invoiceAvailable', {
                  amount: (retrievedPaymentIntent?.amount / 100).toFixed(2),
                })}
              </Text>
            </>
          )}
          {error && (
            <>
              <Text
                textAlign="center"
                m="auto"
                fontWeight={700}
                fontSize="24"
                color="red.400"
                mb="2"
              >
                {t('common.error')}
              </Text>
              <Text mt="4" fontWeight={600} fontSize="16">
                {error}
              </Text>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => modalProps.onClose()}>
            {t('common.close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
