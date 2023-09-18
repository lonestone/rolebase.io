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
import React, { useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  id: string
}

export default function OrgDeleteModal({ id, ...alertProps }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const org = useOrg(id)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [loading, setLoading] = useState(false)

  // Archive org and set loading=true while waiting for org to disappear
  const handleDelete = async () => {
    setLoading(true)
    await archiveOrg({
      orgId: org?.id ?? '',
    })

    // Redirect to root when org disappears
    setTimeout(() => navigate('/'), 4000)
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
            <Button
              colorScheme="red"
              ml={3}
              isLoading={loading}
              onClick={handleDelete}
            >
              {t('common.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
