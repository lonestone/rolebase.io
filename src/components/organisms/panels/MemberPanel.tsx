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
import Panel from '@components/atoms/Panel'
import MemberRoles from '@components/molecules/MemberRoles'
import useMember from '@hooks/useMember'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import React, { useCallback } from 'react'
import { FiEdit3 } from 'react-icons/fi'
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
            <FiEdit3 />
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
