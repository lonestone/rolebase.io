import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UseModalProps,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { type MemberFragment } from '@gql'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SendIcon } from 'src/icons'
import { trpc } from 'src/trpc'

interface MemberInvitationModalProps extends UseModalProps {
  member: MemberFragment
}

export default function MemberInvitationModal({
  member,
  ...modalProps
}: MemberInvitationModalProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleReInvite = async () => {
    if (!member?.inviteEmail || !member.role) return
    setLoading(true)
    try {
      await trpc.member.inviteMember.mutate({
        memberId: member.id,
        role: member.role,
        email: member.inviteEmail,
      })
      toast({
        title: t('MemberInviteModal.toastInvited', {
          member: member.name,
        }),
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error?.response?.data || error?.message || undefined,
        status: 'error',
      })
    }
    setLoading(false)
  }

  const handleRevokeInvite = async () => {
    if (!member?.inviteEmail || !member.role) return
    setLoading(true)
    await trpc.member.updateMemberRole.mutate({
      memberId: member.id,
    })
    setLoading(false)
    toast({
      title: t('MemberInvitationModal.toastRevocated'),
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    modalProps.onClose()
  }

  return (
    <Modal size="lg" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {t('MemberInvitationModal.heading', { member: member.name })}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text>
              {t('MemberInvitationModal.awaiting', {
                email: member.inviteEmail,
                date: format(new Date(member.inviteDate!), 'P'),
              })}
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button
            colorScheme="red"
            variant="outline"
            isLoading={loading}
            onClick={handleRevokeInvite}
          >
            {t('MemberInvitationModal.revoke')}
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            leftIcon={<SendIcon size={20} />}
            isLoading={loading}
            onClick={handleReInvite}
          >
            {t('MemberInvitationModal.resend')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
