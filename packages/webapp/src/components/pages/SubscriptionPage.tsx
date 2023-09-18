import { stripePromise } from '@api/stripe'
import Loading from '@atoms/Loading'
import { Title } from '@atoms/Title'
import { Box, Heading, Text, useDisclosure } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import useOrgOwner from '@hooks/useOrgOwner'
import ScrollableLayout from '@molecules/ScrollableLayout'
import SubscriptionConfirmationModal from '@organisms/subscription/SubscriptionConfirmationModal'
import SubscriptionTabs from '@organisms/subscription/SubscriptionTabs'
import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

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
    <ScrollableLayout
      header={
        <Heading as="h1" size="lg" ml={5} my={2}>
          {t('SubscriptionPage.heading')}
        </Heading>
      }
    >
      <Title>{t('SubscriptionPage.heading')}</Title>

      <Box>
        {isOwner && !isLoading && <SubscriptionTabs w="100%" />}

        {!isOwner && !isLoading && (
          <Text px="10" as="b" color="red.500">
            {t('SubscriptionTabs.mustBeOwner')}
          </Text>
        )}

        {isLoading && <Loading center active />}

        {clientSecret && (
          <Elements stripe={stripePromise}>
            <SubscriptionConfirmationModal
              isOpen={isOpen}
              onClose={onClose}
              clientSecret={clientSecret}
            />
          </Elements>
        )}
      </Box>
    </ScrollableLayout>
  )
}
