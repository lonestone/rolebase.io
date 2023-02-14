import { Flex, FlexProps, Text } from '@chakra-ui/react'
import ParticipantsGroup from '@molecules/ParticipantsGroup'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const MAX_MEMBERS_FREE = 5

export default function SubscriptionFreePlanCardFooter(props: FlexProps) {
  const { t } = useTranslation()
  const members = useStoreState((state) => state.org.members)
  const filteredMembers = useMemo(
    () => members?.filter((mem) => !!mem.userId) ?? [],
    [members]
  )

  return (
    <Flex
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      {...props}
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
      {filteredMembers && (
        <ParticipantsGroup
          size="md"
          max={MAX_MEMBERS_FREE}
          participants={filteredMembers}
        />
      )}
    </Flex>
  )
}
