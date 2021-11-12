import {
  CloseButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import React, { useCallback, useMemo, useState } from 'react'
import { addMemberToCircle } from '../../../api/entities/circles'
import useCircle from '../../../hooks/useCircle'
import { useStoreState } from '../../../store/hooks'
import MemberButton from '../../atoms/MemberButton'

interface Props extends UseModalProps {
  parentId: string
}

export default function CircleMemberCreateModal({ parentId, ...props }: Props) {
  const members = useStoreState((state) => state.members.entries)
  const circle = useCircle(parentId)

  const availableMembers = useMemo(
    () =>
      (circle &&
        members?.filter(
          (m) => circle.members.findIndex((cm) => cm.memberId === m.id) === -1
        )) ||
      [],
    [circle, members]
  )

  // Search
  const [searchText, setSearchText] = useState('')

  // Filter members
  const filteredMembers = useMemo(() => {
    const text = searchText.toLowerCase()
    return availableMembers?.filter(
      (member) => member.name.toLowerCase().indexOf(text) !== -1
    )
  }, [availableMembers, searchText])

  const handleAddMember = useCallback(
    (memberId: string) => {
      if (!parentId) return
      addMemberToCircle(memberId, parentId)
      props.onClose()
    },
    [parentId]
  )

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter un membre au cercle</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={5}>
            <InputGroup>
              <Input
                type="text"
                placeholder="Rechercher..."
                autoFocus
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <InputRightElement
                children={
                  <CloseButton
                    colorScheme="gray"
                    size="sm"
                    onClick={() => setSearchText('')}
                  />
                }
              />
            </InputGroup>

            <Wrap spacing={5} mb={5}>
              {filteredMembers.map((member) => (
                <WrapItem key={member.id}>
                  <MemberButton
                    member={member}
                    onClick={() => handleAddMember(member.id)}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
