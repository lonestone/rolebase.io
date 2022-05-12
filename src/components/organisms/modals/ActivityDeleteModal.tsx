import { deleteActivity } from '@api/entities/activities'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Box,
  Button,
  Text,
} from '@chakra-ui/react'
import ThreadActivity from '@components/molecules/ThreadActivity'
import { ActivityEntry } from '@shared/model/activity'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  activity: ActivityEntry
  onDelete?(): void
}

export default function ActivityDeleteModal({
  activity,
  onDelete,
  ...alertProps
}: Props) {
  const { t } = useTranslation()

  const handleDelete = () => {
    deleteActivity(activity.id)
    onDelete?.()
    alertProps.onClose()
  }

  return (
    <AlertDialog size="2xl" {...alertProps} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t('organisms.modals.ActivityDeleteModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              {t('organisms.modals.ActivityDeleteModal.info1')}
              <br />
              {t('organisms.modals.ActivityDeleteModal.info2')}
            </Text>

            <Box
              mt={5}
              maxH="300px"
              border="1px solid"
              borderColor="gray.500"
              borderRadius="md"
              overflow="auto"
            >
              <ThreadActivity activity={activity} />
            </Box>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={alertProps.onClose}>{t('common.cancel')}</Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              {t('common.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
