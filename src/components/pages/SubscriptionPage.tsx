import { Title } from '@atoms/Title'
import {
  Container,
  Flex,
  Heading,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import useOrgOwner from '@hooks/useOrgOwner'
import SubscriptionConfirmationModal from '@organisms/subscription/SubscriptionConfirmationModal'
import SubscriptionTabs from '@organisms/subscription/SubscriptionTabs'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default function SubscriptionPage() {
  const { t } = useTranslation()
  const currentMember = useCurrentMember()
  const isOwner = useOrgOwner()
  const isLoading = useMemo(() => !currentMember, [currentMember])
  const [searchParams] = useSearchParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const clientSecret = searchParams.get('payment_intent_client_secret')

  useEffect(() => {
    if (clientSecret) {
      onOpen()
    }
  }, [])

  return (
    <Container w="100%" maxW="100%" p="0">
      <Title>{t('SubscriptionPage.heading')}</Title>

      <Flex flexDir="column" gap="10">
        <Heading as="h1" size="md" px="10" pt="10">
          {t('SubscriptionPage.heading')}
        </Heading>

        {isOwner && !isLoading && <SubscriptionTabs w="100%" />}

        {!isOwner && !isLoading && (
          <Text px="10" as="b" color="red.500">
            {t('SubscriptionTabs.mustBeOwner')}
          </Text>
        )}

        {isLoading && <Spinner m="auto" />}
        {clientSecret && (
          <Elements stripe={stripePromise}>
            <SubscriptionConfirmationModal
              isOpen={isOpen}
              onClose={onClose}
              clientSecret={clientSecret}
            />
          </Elements>
        )}
      </Flex>
    </Container>
  )
}
