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
import { ThreadActivityFragment, useDeleteThreadActivityMutation } from '@gql'
import ThreadActivity from '@molecules/thread/ThreadActivity'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface Props
  extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  activity: ThreadActivityFragment
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
