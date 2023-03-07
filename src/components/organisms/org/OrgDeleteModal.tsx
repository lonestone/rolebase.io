import { archiveOrg } from '@api/functions'
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
import useOrg from '@hooks/useOrg'
import React, { useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  id: string
  onDelete(): void
}

export default function OrgDeleteModal({ id, onDelete, ...alertProps }: Props) {
  const { t } = useTranslation()
  const org = useOrg(id)
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleDelete = async () => {
    await archiveOrg({
      orgId: org?.id ?? '',
    })
    onDelete()
    alertProps.onClose()
  }

  if (!org) return null

  return (
    <AlertDialog {...alertProps} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{t('OrgDeleteModal.heading')}</AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              <Trans
                i18nKey="OrgDeleteModal.info"
                values={{ name: org.name }}
                components={{ b: <strong /> }}
              />
            </Text>
            <Text mt="4">
              <Trans
                i18nKey="OrgDeleteModal.warningSubscription"
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
