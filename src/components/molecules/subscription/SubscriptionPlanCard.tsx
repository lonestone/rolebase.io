import FadeCard from '@atoms/FadeCard'
import SubscriptionPlanIcon from '@atoms/SubscriptionPlanIcon'
import { Box, CardProps, Divider, Flex, Tag, Text } from '@chakra-ui/react'
import { Subscription_Plan_Type_Enum } from '@gql'
import SubscriptionFeatures from '@molecules/subscription/SubscriptionFeatures'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

type SubscrptionPlanCard = {
  title: string
  isCurrent: boolean
  desc: string
  features: string[]
  color: string
  type: Subscription_Plan_Type_Enum | null
  footer: ReactElement | null
} & CardProps

export default function SubscriptionPlanCard({
  title,
  desc,
  isCurrent,
  features,
  color,
  type,
  footer,
  ...rest
}: SubscrptionPlanCard) {
  const { t } = useTranslation()

  return (
    <FadeCard
      p="4"
      flexDir="column"
      justifyContent="space-between"
      colorScheme={color}
      {...rest}
    >
      <Box>
        <Flex flexDir="row" justifyContent="space-between">
          <Flex alignItems="center" gap="2" flexDir="row">
            <SubscriptionPlanIcon type={type} />
            <Text fontWeight={700} fontSize="18">
              {title}
            </Text>
          </Flex>
          {isCurrent && (
            <Tag
              borderRadius="full"
              size="lg"
              bg={`${color}.500`}
              color="white"
            >
              {t('SubscriptionPlans.currentPlan')}
            </Tag>
          )}
        </Flex>
        <Divider my="2" />
        <Text
          _dark={{
            color: 'var(--chakra-colors-gray-200)',
          }}
          color="gray.400"
          fontWeight={600}
        >
          {desc}
        </Text>
        <SubscriptionFeatures features={features} />
      </Box>
      {footer && footer}
    </FadeCard>
  )
}
