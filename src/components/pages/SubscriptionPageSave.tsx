import {
  getSubscriptionInvoices,
  getSubscriptionUpcomingInvoice,
  subscribeOrg,
  unsubscribeOrg
} from '@api/functions'
import { Title } from '@atoms/Title'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Text
} from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum, useGetOrgSubscriptionQuery } from '@gql'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import StripePayment from '@organisms/subscription/StripePayment'
import { Invoice, UpcomingInvoice } from '@shared/model/subscription'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default function SubscriptionPage() {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const { data, loading } = useGetOrgSubscriptionQuery({
    variables: {
      orgId: orgId ?? '',
    },
  })
  const [displayElements, setDisplayElements] = useState(false)
  const [options, setOptions] = useState<any>(null)
  const orgSubscription = useMemo(() => data?.org_subscription[0], [data])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [upcomingInvoice, setUpcomingInvoice] = useState<UpcomingInvoice>(null)

  useEffect(() => {
    if (currentMember && orgId) {
      retrieveInvoices()
    }
  }, [currentMember, orgId])

  const retrieveInvoices = async () => {
    if (currentMember && orgId) {
      const apiOptions = {
        memberId: currentMember?.id,
        orgId,
      }

      const invoices = await getSubscriptionInvoices(apiOptions)
      const upcoming = await getSubscriptionUpcomingInvoice(apiOptions)

      setInvoices(invoices)
      setUpcomingInvoice(upcoming)
    }
  }

  const subscribe = async () => {
    try {
      const res: any = await subscribeOrg({
        memberId: currentMember?.id ?? '',
        orgId: orgId ?? '',
        planType: Subscription_Plan_Type_Enum.Startup,
      })

      if (res.clientSecret) {
        setOptions({
          clientSecret: res.clientSecret,
        })
      }
    } catch (e) {
      console.log('Err:', e)
    }
  }

  useEffect(() => {
    setDisplayElements(!!options)
  }, [options])

  const unsubscribe = async () => {
    try {
      await unsubscribeOrg({
        memberId: currentMember?.id ?? '',
        orgId: orgId ?? '',
      })
      window.location.reload()
    } catch (e) {
      console.log('Err:', e)
    }
  }

  return (
    <Container w="100%" maxW="100%" p="5">
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
      <Flex flexDir="column">
        {loading && <Spinner />}
        {!orgSubscription && !loading && (
          <>
            <Text>Current plan: Free</Text>
            <Text>Plan status: Inactive</Text>
          </>
        )}
        {orgSubscription && !loading && (
          <>
            <Text>Current plan: Startup</Text>
            <Text>Plan status: Active</Text>
          </>
        )}
      </Flex>
      <Flex mt="5" flexDir="column">
        Invoices
        {invoices.map((invoice) => (
          <Flex
            mt="2"
            key="invoice.pdfUrl"
            flexDir="row"
            justifyContent={'space-around'}
            alignItems={'center'}
          >
            <Box>{invoice.totalInCents / 100}€</Box>
            <Box>{invoice.status}</Box>
            <Text as="a" color="blue" href={invoice.pdfUrl as string}>
              Invoice
            </Text>
            <Box>{invoice.createdAt}</Box>
          </Flex>
        ))}
      </Flex>

      {upcomingInvoice && (
        <Flex mt="5" flexDir="column">
          Upcoming invoice
          <Flex
            mt="2"
            key="invoice.pdfUrl"
            flexDir="row"
            justifyContent={'space-around'}
            alignItems={'center'}
          >
            <Box>{upcomingInvoice.totalInCents / 100}€</Box>
            <Box>{upcomingInvoice.dueDate}</Box>
          </Flex>
        </Flex>
      )}
      {displayElements && (
        <Elements stripe={stripePromise} options={options}>
          <StripePayment />
        </Elements>
      )}
    </Container>
  )
}
