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
import React from 'react'
import { FiEdit3 } from 'react-icons/fi'
import MemberEditModal from './MemberEditModal'

interface Props {
  id: string
  selectedCircleId?: string
  onCircleSelect?(circleId: string | undefined): void
}

export default function MemberModalContent({
  id,
  selectedCircleId,
  onCircleSelect,
}: Props) {
  const member = useMember(id)

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
          <IconButton
            aria-label=""
            icon={<FiEdit3 />}
            variant="ghost"
            size="sm"
            onClick={onEditOpen}
          />
        </HStack>
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody pb={5}>
        <FormControl>
          <FormLabel>Rôles</FormLabel>
          <MemberRoles
            memberId={id}
            selectedCircleId={selectedCircleId}
            onCircleChange={onCircleSelect}
          />
        </FormControl>
      </ModalBody>

      {isEditOpen && <MemberEditModal id={id} isOpen onClose={onEditClose} />}
    </>
  )
}
