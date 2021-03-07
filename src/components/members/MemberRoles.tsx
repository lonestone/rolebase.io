import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  List,
  ListItem,
  Tag,
  TagCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { getCircleRoles } from '../../api/utils'
import CircleMemberDeleteModal from '../circles/CircleMemberDeleteModal'
import { useStoreState } from '../store/hooks'

interface Props {
  id: string
  highlightCircleId?: string
  onCircleFocus?(circleId: string): void
}

export default function MemberRoles({
  id,
  highlightCircleId,
  onCircleFocus,
}: Props) {
  const roles = useStoreState((state) => state.roles.entries)
  const circles = useStoreState((state) => state.circles.entries)
  const getById = useStoreState((state) => state.members.getById)
  const member = useMemo(() => getById(id), [getById, id])

  // Delete modal
  const [circleId, setCircleId] = useState<string | undefined>()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const handleDelete = (circleId: string) => {
    setCircleId(circleId)
    onDeleteOpen()
  }

  // Get all circles and roles of member
  const memberCircles = useMemo(() => {
    if (!member || !roles || !circles) return []
    return (
      circles
        .filter((c) => c.members.some((m) => m.memberId === member.id))
        .map((circle) => getCircleRoles(circles, roles, circle.id))
        // Sort by circle ids path
        .sort((a, b) =>
          a.reduce((str, c) => str + c.id, '') <
          b.reduce((str, c) => str + c.id, '')
            ? -1
            : 1
        )
    )
  }, [member, roles, circles])

  if (!member) return null

  return (
    <>
      <List styleType="none" marginTop={3} marginBottom={3}>
        {memberCircles.map((entries) => {
          const tagColor =
            highlightCircleId === entries[entries.length - 1].id
              ? 'yellow'
              : 'gray'
          return (
            <ListItem
              key={entries[entries.length - 1].id}
              marginBottom={2}
              style={{
                paddingLeft: '20px',
                textIndent: '-20px',
                lineHeight: '1.7em',
              }}
            >
              {entries.map((circle, i) => {
                const last = i === entries.length - 1
                const variant = last ? 'outline' : 'ghost'
                const name = circle.role?.name || '?'
                const fontWeight = last ? 500 : 400
                return (
                  <React.Fragment key={circle.id}>
                    <span style={{ whiteSpace: 'nowrap', textIndent: 0 }}>
                      {i !== 0 && <ChevronRightIcon />}
                      <Tag
                        variant={variant}
                        colorScheme={tagColor}
                        size="lg"
                        borderRadius="full"
                        fontWeight={fontWeight}
                        fontSize="inherit"
                        cursor={onCircleFocus ? 'pointer' : 'default'}
                        onClick={() => onCircleFocus?.(circle.id)}
                      >
                        {name}
                        {last && (
                          <TagCloseButton
                            onClick={() => handleDelete(circle.id)}
                          />
                        )}
                      </Tag>
                    </span>
                  </React.Fragment>
                )
              })}
            </ListItem>
          )
        })}
      </List>

      {circleId && (
        <CircleMemberDeleteModal
          memberId={id}
          circleId={circleId}
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
        />
      )}
    </>
  )
}
