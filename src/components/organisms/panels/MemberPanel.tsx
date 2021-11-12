import { EditIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button,
  CloseButton,
  Heading,
  HStack,
  Spacer,
  StackItem,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useCallback } from 'react'
import useMember from '../../../hooks/useMember'
import { useNavigateOrg } from '../../../hooks/useNavigateOrg'
import Panel from '../../atoms/Panel'
import MemberRoles from '../../molecules/MemberRoles'
import MemberEditModal from '../modals/MemberEditModal'

interface Props {
  id: string
  highlightCircleId?: string
  onClose(): void
}

export default function MemberPanel({ id, highlightCircleId, onClose }: Props) {
  const member = useMember(id)

  // Edit modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  // Go to circle panel
  const navigateOrg = useNavigateOrg()
  const handleCircleChange = useCallback(
    (circleId: string) => {
      navigateOrg(`?circleId=${circleId}&memberId=${id}`)
    },
    [id]
  )

  if (!member) return null

  return (
    <Panel>
      <Heading size="sm" mb={5}>
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

      <Heading as="h3" size="sm" mb={3} ml={4}>
        Roles
      </Heading>
      <MemberRoles
        memberId={id}
        selectedCircleId={highlightCircleId}
        onCircleChange={handleCircleChange}
      />

      <MemberEditModal id={id} isOpen={isEditOpen} onClose={onEditClose} />
    </Panel>
  )
}
