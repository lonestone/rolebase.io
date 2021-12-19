import { Avatar, MenuItem, MenuItemProps, Stack, Text } from '@chakra-ui/react'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { MemberEntry } from '@shared/member'
import { useStoreState } from '@store/hooks'
import React, { useMemo } from 'react'

interface Props extends MenuItemProps {
  member: MemberEntry
  circlesIds?: string[]
}

export default function MemberMenuItem({
  member,
  circlesIds,
  ...menuItemProps
}: Props) {
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)

  const circlesNames = useMemo(
    () =>
      circles && roles && circlesIds
        ? (circles
            .filter((c) => circlesIds.includes(c.id))
            .map((c) => roles.find((r) => r.id === c.roleId)?.name)
            .filter(Boolean) as string[])
        : [],
    [circles, roles, circlesIds]
  )

  const navigateOrg = useNavigateOrg()
  const handleClick = () =>
    navigateOrg(
      `?memberId=${member.id}${
        circlesIds?.length ? `&circleId=${circlesIds[0]}` : ''
      }`
    )

  return (
    <MenuItem onClick={handleClick} {...menuItemProps}>
      <Avatar
        name={member.name}
        src={member.picture || undefined}
        size="sm"
        mr={2}
      />
      <Stack spacing={0}>
        <Text fontSize="sm">{member.name}</Text>
        {circlesNames.length !== 0 && (
          <Text fontSize="xs">{circlesNames.join(', ')}</Text>
        )}
      </Stack>
    </MenuItem>
  )
}
