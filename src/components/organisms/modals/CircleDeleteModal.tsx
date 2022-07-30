import { archiveCircle } from '@api/entities/circles'
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
import { LogType } from '@shared/model/log'
import React, { useContext, useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { CircleMemberContext } from 'src/contexts/CircleMemberContext'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  id: string
  onDelete?(): void
}

export default function CircleDeleteModal({
  id,
  onDelete,
  ...alertProps
}: Props) {
  const { t } = useTranslation()
  const circleMemberContext = useContext(CircleMemberContext)
  const circle = useCircle(id)
  const createLog = useCreateLog()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleDelete = async () => {
    if (!circle) return
    const changes = await archiveCircle(id)
    onDelete?.()
    alertProps.onClose()

    // Open circle page/panel after animation
    setTimeout(
      () => circleMemberContext?.goTo(circle?.parentId || undefined),
      1000
    )

    // Log change
    createLog({
      display: {
        type: LogType.CircleArchive,
        id: circle.id,
        name: circle.role.name,
      },
      changes,
    })
  }

  if (!circle) return null

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            {t('organisms.modals.CircleDeleteModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              <Trans
                i18nKey="organisms.modals.CircleDeleteModal.info"
                values={{ name: circle.role.name }}
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
