import {
  Box,
  Card,
  Divider,
  HStack,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import {
  CustomerBillingDetails,
  SubscriptionIntentResponse,
} from '@shared/model/subscription'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

type SubscriptionSummaryProps = {
  planType: Subscription_Plan_Type_Enum
  billingDetails: CustomerBillingDetails
  subscriptionInfo: SubscriptionIntentResponse
} & StackProps

export default function SubscriptionSummary({
  planType,
  billingDetails,
  subscriptionInfo,
  ...rest
}: SubscriptionSummaryProps) {
  const { t } = useTranslation()

  const parsedDetails = useMemo(() => {
    if (!billingDetails?.address) return []

    return [billingDetails.name, ...Object.values(billingDetails.address)]
  }, [billingDetails])

  const textProps = useMemo(
    () => ({
      color: 'gray.600',
      _dark: {
        color: 'gray.200',
      },
    }),
    []
  )

  return (
    <VStack p="2" w="100%">
      <Text m="auto">Summary</Text>
      <HStack alignItems="stretch" h="100%" w="100%">
        <Card w="100%" h="100%" p="3" variant="outline">
          <Text mb="4">{t('SubscriptionTabs.paymentModal.details')}</Text>
          <VStack alignItems={'start'}>
            {parsedDetails.map((detail) => (
              <Text mt="0 !important" key={detail} {...textProps}>
                {detail}
              </Text>
            ))}
          </VStack>
        </Card>

        <Card w="100%" h="100%" p="3" variant="outline">
          <VStack h="100%" alignItems="space-between">
            <Text mb="4">{t('SubscriptionTabs.paymentModal.payment')}</Text>
            <Box>
              <HStack justifyContent="space-between" fontSize={14}>
                <Text>{t('SubscriptionTabs.paymentModal.subscription')}</Text>
                <Text {...textProps}>
                  {capitalizeFirstLetter(planType.toLocaleLowerCase())}
                </Text>
              </HStack>

              <HStack justifyContent="space-between" fontSize={14}>
                <Text>{t('SubscriptionTabs.paymentModal.pricePerSeat')}</Text>
                <Text {...textProps}>
                  €
                  {(subscriptionInfo.price.totalPerSeatInCents / 100).toFixed(
                    2
                  )}
                </Text>
              </HStack>

              <HStack justifyContent="space-between" fontSize={14}>
                <Text>
                  {t('SubscriptionTabs.paymentModal.nbSeat', {
                    count: subscriptionInfo.price.quantity,
                  })}
                </Text>
                <Text {...textProps}>{subscriptionInfo.price.quantity}</Text>
              </HStack>

              <Divider mt="1" mb="2" />
              <HStack justifyContent="space-between" fontSize={14}>
                <Text>{t('SubscriptionTabs.paymentModal.total')}</Text>
                <Text fontSize={18} {...textProps}>
                  <>
                    €
                    {(
                      subscriptionInfo.price.quantity *
                      (subscriptionInfo.price.totalPerSeatInCents / 100)
                    ).toFixed(2)}
                    /{t('SubscriptionTabs.paymentModal.month')}
                  </>
                </Text>
              </HStack>
            </Box>
          </VStack>
        </Card>
      </HStack>
    </VStack>
  )
}
