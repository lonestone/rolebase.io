import { archiveMember } from '@api/functions'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react'
import useCreateLog from '@hooks/useCreateLog'
import useMember from '@hooks/useMember'
import { EntityChangeType, LogType } from '@shared/model/log'
import React, { useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  id: string
  onDelete?(): void
}

export default function MemberDeleteModal({
  id,
  onDelete,
  ...alertProps
}: Props) {
  const { t } = useTranslation()
  const member = useMember(id)
  const toast = useToast();
  const createLog = useCreateLog()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleDelete = async () => {
    if (!member) return

    try {
      await archiveMember({ memberId: id })
    } catch (error: any) {
      toast({
        title: t('common.error'),
        description: error?.response?.data || error?.message || undefined,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      alertProps.onClose()
      return
    }

    onDelete?.()
    alertProps.onClose()

    // Log change
    createLog({
      display: {
        type: LogType.MemberArchive,
        id,
        name: member.name,
      },
      changes: {
        members: [
          {
            type: EntityChangeType.Update,
            id: member.id,
            prevData: { archived: false },
            newData: { archived: true },
          },
        ],
      },
    })
  }

  if (!member) return null

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            {t('MemberDeleteModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              <Trans
                i18nKey="MemberDeleteModal.info"
                values={{ name: member.name }}
                components={{ b: <strong /> }}
              />
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={alertProps.onClose}>
              {t('common.cancel')}
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              {t('common.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
