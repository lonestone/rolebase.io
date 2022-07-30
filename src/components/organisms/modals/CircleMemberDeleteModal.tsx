import { removeCircleMember } from '@api/entities/circles'
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
} from '@chakra-ui/react'
import useCircle from '@hooks/useCircle'
import useCreateLog from '@hooks/useCreateLog'
import useMember from '@hooks/useMember'
import { LogType } from '@shared/model/log'
import React, { useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  circleId: string
  memberId: string
  onDelete?(): void
}

export default function CircleMemberDeleteModal({
  circleId,
  memberId,
  onDelete,
  ...alertProps
}: Props) {
  const { t } = useTranslation()
  const createLog = useCreateLog()
  const circle = useCircle(circleId)
  const member = useMember(memberId)
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleDelete = async () => {
    if (!circle || !member) return
    const changes = await removeCircleMember(memberId, circleId)
    onDelete?.()
    alertProps.onClose()

    // Log change
    createLog({
      display: {
        type: LogType.CircleMemberRemove,
        id: circle.id,
        name: circle.role.name,
        memberId: member.id,
        memberName: member.name,
      },
      changes,
    })
  }

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            {t('organisms.modals.CircleMemberDeleteModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              <Trans
                i18nKey="organisms.modals.CircleMemberDeleteModal.info"
                values={{ role: circle?.role.name, member: member?.name }}
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
