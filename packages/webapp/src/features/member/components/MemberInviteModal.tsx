import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Member_Role_Enum, type MemberFragment } from '@gql'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { trpc } from 'src/trpc'
import SubscriptionReachedMemberLimitModal from '@/orgSubscription/modals/SubscriptionReachedMemberLimitModal'
import { SendIcon } from 'src/icons'

interface MemberInviteModalProps extends UseModalProps {
  member: MemberFragment
}

export default function MemberInviteModal({
  member,
  ...modalProps
}: MemberInviteModalProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const limitReachedModal = useDisclosure()

  const handleConfirm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      await trpc.member.inviteMember.mutate({
        memberId: member.id,
        role: Member_Role_Enum.Member,
        email,
      })
      toast({
        title: t('MemberInviteModal.toastInvited', { member: member.name }),
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      modalProps.onClose()
    } catch (error: any) {
      if (error?.response?.status === 402) {
        limitReachedModal.onOpen()
      } else {
        toast({
          title: t('common.error'),
          description: error?.response?.data || error?.message || undefined,
          status: 'error',
        })
      }
    }
    setLoading(false)
  }

  return (
    <>
      <Modal {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleConfirm}>
            <ModalHeader>{t('MemberInviteModal.heading')}</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>{t('MemberInviteModal.email')}</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('MemberInviteModal.emailPlaceholder')}
                  autoFocus
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={modalProps.onClose}>
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                leftIcon={<SendIcon size={20} />}
                isDisabled={!email}
                isLoading={loading}
              >
                {t('MemberInviteModal.invite')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {limitReachedModal.isOpen && (
        <SubscriptionReachedMemberLimitModal
          isOpen
          onClose={limitReachedModal.onClose}
        />
      )}
    </>
  )
}
