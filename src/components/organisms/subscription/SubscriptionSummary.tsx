import { retrieveCouponToSubscription } from '@api/functions'
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  HStack,
  Input,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import useOrgActiveMembers from '@hooks/useOrgActiveMembers'
import { useOrgId } from '@hooks/useOrgId'
import {
  CustomerBillingDetails,
  PromotionCode,
} from '@shared/model/subscription'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Price per seat in cents
const pricesPerSeat: { [key in Subscription_Plan_Type_Enum]?: number } = {
  [Subscription_Plan_Type_Enum.Startup]: 500,
}

type SubscriptionSummaryProps = {
  planType: Subscription_Plan_Type_Enum
  billingDetails: CustomerBillingDetails
  onPromoApplied: (promoCode: string) => void
} & StackProps

export default function SubscriptionSummary({
  planType,
  billingDetails,
  onPromoApplied,
  ...stackProps
}: SubscriptionSummaryProps) {
  const { t } = useTranslation()
  const [coupon, setCoupon] = useState<string>('')
  const [retrievedCoupon, setRetrievedCoupon] = useState<PromotionCode>()
  const [couponError, setCouponError] = useState<string>()
  const [couponLoading, setCouponLoading] = useState<boolean>(false)
  const orgId = useOrgId()
  const nbSeats = useOrgActiveMembers().length
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

  const applyCoupon = async () => {
    setCouponError('')
    setCouponLoading(true)
    try {
      const retrieved = await retrieveCouponToSubscription({
        orgId: orgId ?? '',
        promotionCode: coupon,
      })

      setRetrievedCoupon(retrieved)
      onPromoApplied(retrieved.id)
    } catch (e: any) {
      setCouponError(t('SubscriptionTabs.paymentModal.invalidPromotionCode'))
    } finally {
      setCouponLoading(false)
    }
  }

  const planPricePerSeat = useMemo(
    () => pricesPerSeat[planType] ?? 0,
    [planType]
  )

  const discountText = useMemo(() => {
    if (retrievedCoupon) {
      if (retrievedCoupon.amountOff) {
        return `(${retrievedCoupon.id}: -${retrievedCoupon.amountOff}€)`
      }

      if (retrievedCoupon.percentOff) {
        return `(${retrievedCoupon.id}: -${retrievedCoupon.percentOff}%)`
      }
    }
  }, [retrievedCoupon])

  const totalPrice = useMemo(() => {
    const tot = planPricePerSeat * nbSeats

    if (retrievedCoupon) {
      if (retrievedCoupon.amountOff) return tot - retrievedCoupon.amountOff
      if (retrievedCoupon.percentOff)
        return (tot / 100) * retrievedCoupon.percentOff
    }

    return tot
  }, [planPricePerSeat, retrievedCoupon])

  return (
    <VStack p="2" w="100%" {...stackProps}>
      <Text m="auto">Summary</Text>
      <Flex flexDir="column" alignItems="stretch" gap="2" h="100%" w="100%">
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
                  €{(planPricePerSeat / 100).toFixed(2)}
                </Text>
              </HStack>

              <HStack justifyContent="space-between" fontSize={14}>
                <Text>
                  {t('SubscriptionTabs.paymentModal.nbSeat', {
                    count: nbSeats,
                  })}
                </Text>
                <Text {...textProps}>{nbSeats}</Text>
              </HStack>

              <Divider mt="1" mb="2" />
              {retrievedCoupon && (
                <HStack
                  justifyContent="space-between"
                  alignItems="end"
                  fontSize={14}
                >
                  <Text>{t('SubscriptionTabs.paymentModal.dueNow')}</Text>
                  <Flex flexDir="column" alignItems="end">
                    <Flex
                      flexDir="column"
                      alignItems="end"
                      fontWeight="400 !important"
                      as="i"
                      fontSize={12}
                    >
                      <Text textDecoration="line-through" {...textProps}>
                        {((planPricePerSeat * nbSeats) / 100).toFixed(2)}€
                      </Text>
                      <Text {...textProps}>{discountText}</Text>
                    </Flex>
                    <Text fontSize={18} {...textProps}>
                      {(totalPrice / 100).toFixed(2)}€
                    </Text>
                  </Flex>
                </HStack>
              )}
              <HStack
                justifyContent="space-between"
                alignItems="end"
                fontSize={14}
              >
                <Text>{t('SubscriptionTabs.paymentModal.total')}</Text>
                <Text fontSize={18} {...textProps}>
                  {((planPricePerSeat * nbSeats) / 100).toFixed(2)}€/
                  {t('SubscriptionTabs.paymentModal.month')}
                </Text>
              </HStack>
            </Box>
          </VStack>
        </Card>
      </Flex>
      <Flex mt="5" justifyContent="end" w="100%" gap="2">
        <Input
          value={coupon}
          placeholder={t('SubscriptionTabs.paymentModal.promotionPlaceholder')}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <Button isLoading={couponLoading} onClick={applyCoupon}>
          {t('common.apply')}
        </Button>
      </Flex>
      {couponError && <Text color="red.500">{couponError}</Text>}
    </VStack>
  )
}
