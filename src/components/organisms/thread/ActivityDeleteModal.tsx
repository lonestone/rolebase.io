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
import { ActivityEntry } from '@shared/model/thread_activity'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDeleteThreadActivityMutation } from 'src/graphql.generated'

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
  const [deleteActivity] = useDeleteThreadActivityMutation()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleDelete = () => {
    deleteActivity({ variables: { id: activity.id } })
    onDelete?.()
    alertProps.onClose()
  }

  return (
    <AlertDialog size="2xl" {...alertProps} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            {t('ActivityDeleteModal.heading')}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              {t('ActivityDeleteModal.info1')}
              <br />
              {t('ActivityDeleteModal.info2')}
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
