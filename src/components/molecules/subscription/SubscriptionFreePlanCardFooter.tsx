import { Flex, FlexProps, Text } from '@chakra-ui/react'
import ParticipantsGroup from '@molecules/ParticipantsGroup'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'

const MAX_MEMBERS_FREE = 5

export default function SubscriptionFreePlanCardFooter({ ...rest }: FlexProps) {
  const { t } = useTranslation()
  const members = useStoreState((state) => state.members.entries)

  return (
    <Flex
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <Text
        fontWeight={600}
        _dark={{
          color: 'var(--chakra-colors-gray-300)',
        }}
        color="gray.500"
      >
        {t('SubscriptionPlans.activeMember', {
          count: members?.length ?? 0,
          total: MAX_MEMBERS_FREE,
        })}
      </Text>
      {members && (
        <ParticipantsGroup
          size="md"
          max={MAX_MEMBERS_FREE}
          participants={members}
        />
      )}
    </Flex>
  )
}
