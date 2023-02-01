import FadeCard from '@atoms/FadeCard'
import { Box, CardProps, Divider, Flex, Tag, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck, FiCoffee } from 'react-icons/fi'

type SubscrptionPlanCard = {
  title: string
  isCurrent: boolean
  desc: string
  features: string[]
  color: string
  footer: ReactElement | null
} & CardProps

export default function SubscriptionPlanCard({
  title,
  desc,
  isCurrent,
  features,
  color,
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
            <FiCoffee />
            <Text fontWeight={700} fontSize="16">
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
        <Flex mt="4" flexDir="column" gap="3">
          {features.map((feature) => (
            <Flex key={feature} flexDir="row" gap="6" alignItems="center">
              <FiCheck size="20" color="green" />
              <Text
                color="gray.600"
                fontWeight={600}
                _dark={{
                  color: 'var(--chakra-colors-gray-100)',
                }}
              >
                {feature}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
      {footer && footer}
    </FadeCard>
  )
}
