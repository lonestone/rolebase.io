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
  useToast,
} from '@chakra-ui/react'
import { type MemberFragment } from '@gql'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { trpc } from 'src/trpc'

interface MemberRemoveAccessModalProps {
  member: MemberFragment
  isOpen: boolean
  onClose: () => void
}

export default function MemberRemoveAccessModal({
  member,
  isOpen,
  onClose,
}: MemberRemoveAccessModalProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleRemoveAccess = useCallback(async () => {
    setLoading(true)
    try {
      if (member.userId) {
        await trpc.member.updateMemberRole.mutate({
          memberId: member.id,
          role: undefined,
        })
        toast({
          title: t('MemberRemoveAccessModal.success'),
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error?.response?.data || error?.message || undefined,
        status: 'error',
      })
    }
    setLoading(false)
    onClose()
  }, [member, toast, t, onClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('MemberRemoveAccessModal.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {t('MemberRemoveAccessModal.description', {
              name: member.name,
            })}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            colorScheme="red"
            onClick={handleRemoveAccess}
            isLoading={loading}
          >
            {t('MemberRemoveAccessModal.confirm')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
