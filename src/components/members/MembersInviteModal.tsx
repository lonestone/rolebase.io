import { EmailIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  UseModalProps,
  useToast,
  VStack,
} from '@chakra-ui/react'
import React, { useCallback, useMemo, useReducer, useState } from 'react'
import { inviteMember } from '../../api/entities/members'
import MemberButton from '../common/MemberButton'
import { useStoreState } from '../store/hooks'
import {
  getEmailFromName,
  guessEmailPattern,
  memberInviteReducer,
} from './membersInvite'

export default function MembersInviteModal(props: UseModalProps) {
  const toast = useToast()
  const members = useStoreState((state) => state.members.entries)

  const notInvitedMembers = useMemo(
    () => members?.filter((m) => !m.userId && !m.inviteDate) || [],
    [members]
  )

  const [state, dispatch] = useReducer(memberInviteReducer, {})
  const [isInviting, setIsInviting] = useState(false)

  // Search
  const [searchText, setSearchText] = useState('')

  // Filter members
  const filteredMembers = useMemo(() => {
    const text = searchText.toLowerCase()
    return notInvitedMembers?.filter(
      (member) => member.name.toLowerCase().indexOf(text) !== -1
    )
  }, [notInvitedMembers, searchText])

  const nbSelectedMembers = useMemo(
    () =>
      Object.values(state).reduce(
        (count, memberState) => count + (memberState?.selected ? 1 : 0),
        0
      ),
    [state]
  )

  // Auto-fill email addresses from a detected pattern
  const handleEmailBlur = useCallback(
    (id: string) => {
      if (!notInvitedMembers) return
      const refMemberState = state[id]
      const refMember = notInvitedMembers.find((m) => m.id === id)
      if (!refMemberState || !refMember) return

      // Enable member invitation
      if (!refMemberState.selected && refMemberState.email !== '') {
        dispatch({ type: 'Toggle', id })
      }

      // Guess email pattern
      const emailPattern = guessEmailPattern(
        refMemberState.email,
        refMember.name
      )
      if (emailPattern) {
        for (const member of notInvitedMembers) {
          const memberState = state[member.id]
          if (!memberState || memberState.emailAuto || !memberState.email) {
            const email = getEmailFromName(member.name, emailPattern)
            if (email && email != memberState?.email) {
              dispatch({
                type: 'SetEmail',
                id: member.id,
                email,
                emailAuto: true,
              })
            }
          }
        }
      }
    },
    [state, notInvitedMembers]
  )

  const handleInvite = useCallback(async () => {
    setIsInviting(true)
    try {
      let n = 0
      for (const member of notInvitedMembers) {
        const memberState = state[member.id]
        if (memberState && memberState.email && memberState.selected) {
          await inviteMember(member.id, memberState.email)
          n++
        }
      }
      toast({
        title: `${n} membre${n > 1 ? 's' : ''} invité${n > 1 ? 's' : ''}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      props.onClose()
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : '',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      setIsInviting(false)
    }
  }, [state, props.onClose])

  return (
    <Modal {...props} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Inviter des membres par email</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {filteredMembers.length === 0 ? (
            <Box mb={5}>
              <p>
                Tous les membres existants sont déjà liés à un compte
                utilisateur.
              </p>
              <p>Vous pouvez créer un nouveau membre puis l'inviter</p>
            </Box>
          ) : (
            <VStack spacing={5} align="stretch">
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Rechercher..."
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

              <VStack spacing={2} align="stretch">
                {filteredMembers.map((member) => {
                  const memberState = state[member.id]
                  return (
                    <Flex key={member.id} alignItems="center" wrap="wrap">
                      <Checkbox
                        mr={2}
                        isChecked={memberState?.selected || false}
                        onChange={() =>
                          dispatch({
                            type: 'Toggle',
                            id: member.id,
                          })
                        }
                      />
                      <MemberButton
                        member={member}
                        onClick={() =>
                          dispatch({
                            type: 'Toggle',
                            id: member.id,
                          })
                        }
                      />
                      <Spacer />
                      <Input
                        placeholder="Email..."
                        width="220px"
                        value={memberState?.email || ''}
                        onChange={(e) =>
                          dispatch({
                            type: 'SetEmail',
                            id: member.id,
                            email: e.target.value,
                          })
                        }
                        onBlur={() => handleEmailBlur(member.id)}
                      />
                    </Flex>
                  )
                })}
              </VStack>

              <Box textAlign="right" mt={2}>
                <Button
                  colorScheme="blue"
                  isLoading={isInviting}
                  isDisabled={nbSelectedMembers === 0}
                  leftIcon={<EmailIcon />}
                  onClick={handleInvite}
                >
                  Inviter ({nbSelectedMembers})
                </Button>
              </Box>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
