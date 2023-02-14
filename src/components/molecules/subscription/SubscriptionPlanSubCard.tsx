import FadeCard from '@atoms/FadeCard'
import SubscriptionPlanIcon from '@atoms/SubscriptionPlanIcon'
import {
  Box,
  CardProps,
  Divider,
  Flex,
  Tag,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import ParticipantsGroup from '@molecules/ParticipantsGroup'
import SubscriptionFeatures from '@molecules/subscription/SubscriptionFeatures'
import { useStoreState } from '@store/hooks'
import { SubscriptionPlan } from '@utils/subscriptionPlansTypes'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

type SubscrptionPlanCard = SubscriptionPlan & CardProps

export default function SubscriptionPlanSubCard({
  title,
  desc,
  features,
  color,
  type,
  ...cardProps
}: SubscrptionPlanCard) {
  const { t } = useTranslation()
  const nbParticipantBreakpoint = useBreakpointValue({
    base: 4,
    md: 7,
  })
  const members = useStoreState((state) => state.org.members)
  const filteredMembers = useMemo(
    () => members?.filter((mem) => !!mem.userId) ?? [],
    [members]
  )

  return (
    <FadeCard
      p="4"
      pb="10"
      flexDir="column"
      justifyContent="space-between"
      colorScheme={color}
      {...cardProps}
    >
      <Box>
        <Flex flexDir="row" justifyContent="space-between">
          <Flex flexDir="column" gap="2">
            <Flex flexDir="row" alignItems="center" gap="2">
              <SubscriptionPlanIcon type={type} size={24} />
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

          <Flex flexDir="column" gap="2" alignItems="end" minW="110px">
            {filteredMembers && (
              <ParticipantsGroup
                max={nbParticipantBreakpoint}
                size="sm"
                participants={filteredMembers}
              />
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
          <SubscriptionFeatures features={features} />
        </Box>
      </Box>
    </FadeCard>
  )
}
