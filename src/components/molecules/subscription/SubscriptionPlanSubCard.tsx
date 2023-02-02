import FadeCard from '@atoms/FadeCard'
import { Box, CardProps, Divider, Flex, Tag, Text } from '@chakra-ui/react'
import ParticipantsGroup from '@molecules/ParticipantsGroup'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck, FiCoffee } from 'react-icons/fi'

type SubscrptionPlanCard = {
  title: string
  desc: string
  features: string[]
  color: string
} & CardProps

export default function SubscriptionPlanSubCard({
  title,
  desc,
  features,
  color,
  ...rest
}: SubscrptionPlanCard) {
  const { t } = useTranslation()
  const members = useStoreState((state) =>
    state.members.entries
      ?.concat(state.members.entries)
      ?.concat(state.members.entries)
      ?.concat(state.members.entries)
      ?.concat(state.members.entries)
      ?.concat(state.members.entries)
      ?.concat(state.members.entries)
      ?.concat(state.members.entries)
      ?.concat(state.members.entries)
      ?.concat(state.members.entries)
      ?.concat(state.members.entries)
      ?.concat(state.members.entries)
      ?.concat(state.members.entries)
  )

  return (
    <FadeCard
      p="4"
      pb="10"
      flexDir="column"
      justifyContent="space-between"
      colorScheme={color}
      {...rest}
    >
      <Box>
        <Flex flexDir="row" justifyContent="space-between">
          <Flex flexDir="column" gap="2">
            <Flex flexDir="row" alignItems="center" gap="2">
              <FiCoffee size={24} />
              <Text fontWeight={700} fontSize="24">
                {title}
              </Text>
            </Flex>
            <Text
              _dark={{
                color: 'var(--chakra-colors-gray-200)',
              }}
              color="gray.400"
              fontWeight={600}
              maxWidth="80%"
            >
              {desc}
            </Text>
          </Flex>

          <Flex flexDir="column" gap="2" alignItems="end">
            {members && (
              <ParticipantsGroup max={7} size="sm" participants={members} />
            )}
            <Tag
              borderRadius="full"
              size="lg"
              bg={`${color}.500`}
              color="white"
            >
              {t('SubscriptionPlans.currentPlan')}
            </Tag>
          </Flex>
        </Flex>
        <Divider my="4" />
        <Box ml={['auto', 'auto', '20%']}>
          <Text as="b" fontSize={18}>
            {t('SubscriptionPlans.included')}
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
      </Box>
    </FadeCard>
  )
}
