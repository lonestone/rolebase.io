import { ChevronRightIcon, EditIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button,
  Heading,
  HStack,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  StackItem,
  Tag,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useCircles } from '../../data/circles'
import { useMember } from '../../data/members'
import { useRoles } from '../../data/roles'
import { getCircleRoles } from '../../data/utils'
import Loading from '../Loading'
import TextErrors from '../TextErrors'
import MemberEditModal from './MemberEditModal'

interface Props {
  id: string
  isOpen: boolean
  onClose(): void
}

export default function MemberModal({ id, isOpen, onClose }: Props) {
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Loading active={memberLoading || rolesLoading || circlesLoading} />
          <TextErrors errors={[memberError, rolesError, circlesError]} />

          {member && (
            <>
              <ModalHeader>
                <HStack spacing={5}>
                  {member.picture && (
                    <Avatar name={member.name} src={member.picture} size="lg" />
                  )}
                  <StackItem>{member.name}</StackItem>
                  <Button onClick={onEditOpen}>
                    <EditIcon />
                  </Button>
                </HStack>
              </ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <Heading size="sm">Cercles</Heading>
                <List styleType="none" marginTop={3} marginBottom={3}>
                  {memberCircles.map((entries) => (
                    <ListItem key={entries[entries.length - 1].id}>
                      {entries.map((circle, i) => (
                        <React.Fragment key={circle.id}>
                          {i !== 0 && <ChevronRightIcon />}
                          <Tag>{circle.role?.name || '?'}</Tag>
                        </React.Fragment>
                      ))}
                    </ListItem>
                  ))}
                </List>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {member && (
        <MemberEditModal id={id} isOpen={isEditOpen} onClose={onEditClose} />
      )}
    </>
  )
}
