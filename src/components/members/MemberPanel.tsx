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
import { useCircles } from '../../data/circles'
import { useMember } from '../../data/members'
import { useRoles } from '../../data/roles'
import { getCircleRoles } from '../../data/utils'
import Loading from '../common/Loading'
import Panel from '../common/Panel'
import TextErrors from '../common/TextErrors'
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
  const [member, memberLoading, memberError] = useMember(id)
  const [roles, rolesLoading, rolesError] = useRoles()
  const [circles, circlesLoading, circlesError] = useCircles()

  const memberCircles = useMemo(() => {
    if (!member || !roles || !circles) return []
    return circles
      .filter((c) => c.members.some((m) => m.memberId === member.id))
      .map((circle) => getCircleRoles(circles, roles, circle.id))
  }, [member, roles, circles])

  // Edit modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  return (
    <>
      <Loading active={memberLoading || rolesLoading || circlesLoading} />
      <TextErrors errors={[memberError, rolesError, circlesError]} />

      {member && (
        <Panel>
          <Heading size="sm" marginBottom={5}>
            <HStack spacing={5}>
              {member.picture && (
                <Avatar name={member.name} src={member.picture} size="lg" />
              )}
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
      )}
    </>
  )
}
