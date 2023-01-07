import { Avatar, MenuItem, MenuItemProps, Stack, Text } from '@chakra-ui/react'
import { MemberEntry } from '@shared/model/member'
import { useStoreState } from '@store/hooks'
import { textEllipsis } from '@utils/textEllipsis'
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

  return (
    <MenuItem {...menuItemProps}>
      <Avatar
        name={member.name}
        src={member.picture || undefined}
        size="sm"
        mr={2}
      />
      <Stack spacing={0}>
        <Text fontSize="sm">{member.name}</Text>
        {circlesNames.length !== 0 && (
          <Text fontSize="xs">{textEllipsis(circlesNames.join(', '), 40)}</Text>
        )}
      </Stack>
    </MenuItem>
  )
}
