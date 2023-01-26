import { subscribeOrg } from '@api/functions'
import { Title } from '@atoms/Title'
import StripePayment from '@organisms/subscription/StripePayment'
import { Button, Container, Flex, Heading, Spacer } from '@chakra-ui/react'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  'pk_test_51MTnUCFbDx5R7pIdjvJ0kQ6gzkXExNcMJxSmAhc6tmF2dTu3qYa4tNQZBFqcy3ZNCobM9cxq4w9nn3gnpHKddHDn00vrm59S4L'
)

export default function SubscriptionPage() {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const [displayElements, setDisplayElements] = useState(false)
  const [options, setOptions] = useState<any>(null)

  const subscribe = async () => {
    const res: any = await subscribeOrg({
      memberId: currentMember?.id ?? '',
      orgId: orgId ?? '',
    })

    if (res.clientSecret) {
      setOptions({
        clientSecret: res.clientSecret,
      })
    }
  }

  useEffect(() => {
    setDisplayElements(!!options)
  }, [options])

  const unsubscribe = () => {}

  return (
    <Container maxW="xl" py={10}>
      <Title>{t('SubscriptionPage.heading')}</Title>

      <Flex mb={5} alignItems="center" flexWrap="wrap">
        <Heading as="h1" size="md">
          {t('SubscriptionPage.heading')}
        </Heading>
        <Spacer />
        <Button color="green" onClick={subscribe}>
          ABONE
        </Button>
        <Button color="red" onClick={unsubscribe}>
          PLUS ABONE
        </Button>
      </Flex>
      <Spacer />
      {displayElements && (
        <Elements stripe={stripePromise} options={options}>
          <StripePayment />
        </Elements>
      )}
    </Container>
  )
}
