import { ChevronRightIcon, EditIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button,
  CloseButton,
  Heading,
  HStack,
  List,
  ListItem,
  Spacer,
  StackItem,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { getCircleRoles } from '../../api/utils'
import Panel from '../common/Panel'
import { useStoreState } from '../store/hooks'
import MemberEditModal from './MemberEditModal'

interface Props {
  id: string
  highlightCircleId?: string
  onClose(): void
  onCircleFocus?(circleId: string): void
}

export default function MemberPanel({
  id,
  highlightCircleId,
  onClose,
  onCircleFocus,
}: Props) {
  const roles = useStoreState((state) => state.roles.entries)
  const circles = useStoreState((state) => state.circles.entries)
  const getById = useStoreState((state) => state.members.getById)
  const member = useMemo(() => getById(id), [getById, id])

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

  // Edit modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  if (!member) return null

  return (
    <Panel>
      <Heading size="sm" marginBottom={5}>
        <HStack spacing={5}>
          <Avatar
            name={member.name}
            src={member.picture || undefined}
            size="lg"
          />
          <StackItem>{member.name}</StackItem>
          <Button onClick={onEditOpen}>
            <EditIcon />
          </Button>
          <Spacer />
          <CloseButton onClick={onClose} />
        </HStack>
      </Heading>

      <Heading size="xs">Rôles</Heading>
      <List styleType="none" marginTop={3} marginBottom={3}>
        {memberCircles.map((entries) => {
          const tagColor =
            highlightCircleId === entries[entries.length - 1].id
              ? 'yellow'
              : 'gray'
          return (
            <ListItem key={entries[entries.length - 1].id} marginBottom={2}>
              {entries.map((circle, i) => (
                <React.Fragment key={circle.id}>
                  {i !== 0 && <ChevronRightIcon />}
                  <Button
                    variant="outline"
                    colorScheme={tagColor}
                    size="xs"
                    onClick={() => onCircleFocus?.(circle.id)}
                  >
                    {circle.role?.name || '?'}
                  </Button>
                </React.Fragment>
              ))}
            </ListItem>
          )
        })}
      </List>

      <MemberEditModal id={id} isOpen={isEditOpen} onClose={onEditClose} />
    </Panel>
  )
}
