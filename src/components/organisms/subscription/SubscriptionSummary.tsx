import { getPricePreview } from '@api/functions'
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  HStack,
  Heading,
  Input,
  Spinner,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import {
  CustomerBillingDetails,
  PricePreview,
} from '@shared/model/subscription'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  const [retrievedCoupon, setRetrievedCoupon] = useState<PricePreview>()
  const [couponError, setCouponError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [couponDuration, setCouponDuration] = useState<number>()
  const [priceData, setPriceData] = useState<
    Omit<PricePreview, 'promotionCode'>
  >({})
  const orgId = useOrgId()
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

  const retrievePricePreview = async () => {
    setLoading(true)

    try {
      const retrieved = await getPricePreview({
        orgId: orgId ?? '',
        promotionCode: coupon,
        planType,
        address: billingDetails?.address,
      })

      if (retrieved?.promotionCode) {
        setRetrievedCoupon(retrieved?.promotionCode)
        onPromoApplied(retrieved.promotionCode.id)
      }

      if (retrieved) {
        setPriceData(retrieved)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    retrievePricePreview()
  }, [billingDetails])

  const applyCoupon = async () => {
    if (!coupon) return
    setCouponError('')
    setCouponDuration(undefined)
    try {
      await retrievePricePreview()
    } catch (e: any) {
      setCouponError(t('SubscriptionTabs.paymentModal.invalidPromotionCode'))
    }
  }

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
    const tot = priceData.subTotalPerSeatInCents * priceData.quantity

    if (retrievedCoupon) {
      if (retrievedCoupon.amountOff) return tot - retrievedCoupon.amountOff
      if (retrievedCoupon.percentOff)
        return tot - (tot * retrievedCoupon.percentOff) / 100
    }

    return tot
  }, [priceData, retrievedCoupon])

  const totalPriceWithVAT = useMemo(() => {
    return totalPrice + (totalPrice * (priceData.tax ?? 1)) / 100
  }, [priceData, totalPrice])

  const pricePerMonth = useMemo(() => {
    if (retrievedCoupon) {
      if (retrievedCoupon.duration.type === 'once') {
        return priceData.subTotalPerSeatInCents * priceData.quantity
      } else if (retrievedCoupon.duration.type === 'repeating') {
        setCouponDuration(retrievedCoupon.duration.durationInMonth)
        return totalPrice
      } else {
        return totalPrice
      }
    }
    return totalPrice
  }, [retrievedCoupon, totalPrice])

  return (
    <VStack w="100%" {...stackProps}>
      <Flex flexDir="column" alignItems="stretch" gap="2" h="100%" w="100%">
        <Card w="100%" h="100%" p="3" variant="outline">
          <Heading as="h4" fontSize="md" mb="4">
            {t('SubscriptionTabs.paymentModal.details')}
          </Heading>
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
            <Heading as="h4" fontSize="md" mb="4">
              {t('SubscriptionTabs.paymentModal.payment')}
            </Heading>
            {loading && (
              <HStack w="100%" justify="center">
                <Spinner size="xl" />
              </HStack>
            )}
            {!loading && (
              <>
                <Box>
                  <HStack justifyContent="space-between" fontSize={14}>
                    <Text>
                      {t('SubscriptionTabs.paymentModal.subscription')}
                    </Text>
                    <Text {...textProps}>
                      {capitalizeFirstLetter(planType.toLocaleLowerCase())}
                    </Text>
                  </HStack>

                  <HStack justifyContent="space-between" fontSize={14}>
                    <Text>
                      {t('SubscriptionTabs.paymentModal.pricePerSeat')}
                    </Text>
                    <Text {...textProps}>
                      €{(priceData.subTotalPerSeatInCents / 100).toFixed(2)}
                    </Text>
                  </HStack>

                  <HStack justifyContent="space-between" fontSize={14}>
                    <Text>
                      {t('SubscriptionTabs.paymentModal.nbSeat', {
                        count: priceData.quantity,
                      })}
                    </Text>
                    <Text {...textProps}>{priceData.quantity}</Text>
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
                            {(
                              (priceData.subTotalPerSeatInCents *
                                priceData.quantity) /
                              100
                            ).toFixed(2)}
                            €
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
                    <Text>
                      {t(
                        `SubscriptionTabs.paymentModal.${
                          priceData.tax ? 'subTotal' : 'total'
                        }`
                      )}
                    </Text>
                    <Text fontSize={18} {...textProps}>
                      {(pricePerMonth / 100).toFixed(2)}€/
                      {t('SubscriptionTabs.paymentModal.month')}
                    </Text>
                  </HStack>
                  {priceData.tax && (
                    <HStack
                      justifyContent="space-between"
                      alignItems="end"
                      fontSize={14}
                    >
                      <Text>
                        {t('SubscriptionTabs.paymentModal.totalWithVAT', {
                          percentage: priceData.tax,
                          count: (
                            (totalPrice * (priceData.tax ?? 1)) /
                            10000
                          ).toFixed(2),
                        })}
                      </Text>
                      <Text fontSize={18} {...textProps}>
                        {(totalPriceWithVAT / 100).toFixed(2)}
                        €/
                        {t('SubscriptionTabs.paymentModal.month')}
                      </Text>
                    </HStack>
                  )}

                  {couponDuration && (
                    <Flex w="100%" justify="end">
                      <Text fontSize={12} {...textProps}>
                        {t('SubscriptionTabs.paymentModal.duration', {
                          price:
                            (priceData.subTotalPerSeatInCents *
                              priceData.quantity) /
                            100,
                          durationInMonth: couponDuration,
                        })}
                      </Text>
                    </Flex>
                  )}
                </Box>
              </>
            )}
          </VStack>
        </Card>
      </Flex>
      <Flex mt="5" justifyContent="end" w="100%" gap="2">
        <Input
          value={coupon}
          placeholder={t('SubscriptionTabs.paymentModal.promotionPlaceholder')}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <Button isLoading={loading} onClick={applyCoupon}>
          {t('common.apply')}
        </Button>
      </Flex>
      {couponError && <Text color="red.500">{couponError}</Text>}
    </VStack>
  )
}
