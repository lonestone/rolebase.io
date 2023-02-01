import { Avatar, Box, Flex, FlexProps, Text } from '@chakra-ui/react'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const MAX_MEMBERS_FREE = 5

export default function SubscriptionFreePlanCardFooter({ ...rest }: FlexProps) {
  const { t } = useTranslation()
  const members = useStoreState((state) => state.members.entries)
  const n = members?.length ?? 0
  const filteredMembers = useMemo(
    () =>
      members
        ? members.filter((mem) => !!mem.userId).slice(0, MAX_MEMBERS_FREE)
        : [],
    [members]
  )

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
          count: n,
          total: MAX_MEMBERS_FREE,
        })}
      </Text>
      <Box h="100%" mr="5" w="10px" pos="relative">
        {filteredMembers
          .concat(filteredMembers)
          .concat(filteredMembers)
          .concat(filteredMembers)
          .map(
            (member, i) =>
              // TODO: Composant frerot
              member && (
                <Box
                  key={i}
                  borderRadius="full"
                  p="1px"
                  pos="absolute"
                  bg={`linear-gradient(-90deg, white, transparent)`}
                  _dark={{
                    bg: `linear-gradient(-90deg, var(--chakra-colors-gray-800), transparent)`,
                  }}
                  top="50%"
                  transform="translateY(-50%)"
                  left={`calc(${n - i - 1} * var(--chakra-sizes-14) / 2.4)`}
                >
                  <Avatar
                    name={member.name}
                    src={member.picture || undefined}
                    bg="gray.500"
                    size="sm"
                  />
                </Box>
              )
          )}
      </Box>
    </Flex>
  )
}
