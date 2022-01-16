import {
  Avatar,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  StackItem,
  useDisclosure,
} from '@chakra-ui/react'
import MemberRoles from '@components/molecules/MemberRoles'
import useMember from '@hooks/useMember'
import { useOrgRole } from '@hooks/useOrgRole'
import { ClaimRole } from '@shared/userClaims'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { FiEdit3 } from 'react-icons/fi'
import MemberEditModal from './MemberEditModal'

interface Props {
  id: string
  selectedCircleId?: string
}

export default function MemberModalContent({ id, selectedCircleId }: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const member = useMember(id)
  const role = useOrgRole()
  const canEdit =
    role === ClaimRole.Admin || (userId ? member?.userId === userId : false)

  // Edit modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  if (!member) return null

  return (
    <>
      <ModalHeader>
        <HStack spacing={5}>
          <Avatar
            name={member.name}
            src={member.picture || undefined}
            size="lg"
          />
          <StackItem>{member.name}</StackItem>

          {canEdit && (
            <IconButton
              aria-label=""
              icon={<FiEdit3 />}
              variant="ghost"
              size="sm"
              onClick={onEditOpen}
            />
          )}
        </HStack>
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody pb={5}>
        <FormControl>
          <FormLabel>Rôles</FormLabel>
          <MemberRoles memberId={id} selectedCircleId={selectedCircleId} />
        </FormControl>
      </ModalBody>

      {isEditOpen && <MemberEditModal id={id} isOpen onClose={onEditClose} />}
    </>
  )
}
