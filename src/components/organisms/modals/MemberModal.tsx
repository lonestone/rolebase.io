import {
  Avatar,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  StackItem,
  useDisclosure,
  UseModalProps,
} from '@chakra-ui/react'
import MemberRoles from '@components/molecules/MemberRoles'
import useMember from '@hooks/useMember'
import React, { useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import MemberEditModal from './MemberEditModal'

interface Props extends UseModalProps {
  id: string
  defaultSelectedCircleId?: string
}

export default function MemberModal({
  id,
  defaultSelectedCircleId,
  ...modalProps
}: Props) {
  const member = useMember(id)

  // Edit modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  // Selected circle
  const [selectedCircleId, setSelectedCircleId] = useState<string | undefined>(
    defaultSelectedCircleId
  )

  if (!member) return null

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
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
              onCircleChange={setSelectedCircleId}
            />
          </FormControl>
        </ModalBody>
      </ModalContent>

      {isEditOpen && <MemberEditModal id={id} isOpen onClose={onEditClose} />}
    </Modal>
  )
}
