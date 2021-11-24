import {
  activityPollSchema,
  createActivity,
  updateActivity,
} from '@api/entities/activities'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import MarkdownEditorController from '@components/atoms/MarkdownEditorController'
import EntityButtonComboboxController from '@components/molecules/search/EntityButtonComboboxController'
import { yupResolver } from '@hookform/resolvers/yup'
import { ActivityDecision, ActivityType } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'

interface Props extends UseModalProps {
  threadId: string
  circleId?: string
  activity?: WithId<ActivityDecision>
}

interface Values {
  circleId: string
  decision: string
  explanation: string
}

export default function ActivityPollModal({
  threadId,
  circleId,
  activity,
  ...modalProps
}: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const orgId = useStoreState((state) => state.orgs.currentId)

  const { handleSubmit, control, errors } = useForm<Values>({
    resolver: yupResolver(activityPollSchema),
    defaultValues: activity || {
      circleId: circleId || '',
      decision: '',
      explanation: '',
    },
  })

  const onSubmit = handleSubmit(async ({ circleId, decision, explanation }) => {
    if (!orgId || !userId) return
    try {
      if (activity) {
        await updateActivity(activity.id, {
          circleId,
          decision,
          explanation,
        })
      } else {
        await createActivity({
          orgId,
          userId,
          threadId,
          type: ActivityType.Decision,
          circleId,
          decision,
          explanation,
        })
      }
      modalProps.onClose()
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <Modal size="2xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {activity ? 'Modifier une décision' : 'Ajouter une décision'}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={onSubmit}>
            <VStack spacing={5} align="stretch">
              <FormControl isInvalid={!!errors.decision}>
                <FormLabel htmlFor="decision">Décision</FormLabel>
                <MarkdownEditorController
                  name="decision"
                  placeholder="Qu'avez-vous décidé ?"
                  autoFocus
                  control={control}
                />
                <FormErrorMessage>
                  {errors.decision && errors.decision.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.explanation}>
                <FormLabel htmlFor="explanation">Explications</FormLabel>
                <MarkdownEditorController
                  name="explanation"
                  placeholder="Pourquoi avez-vous pris cette décision ?"
                  control={control}
                />
                <FormErrorMessage>
                  {errors.explanation && errors.explanation.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.circleId}>
                <FormLabel htmlFor="circleId">Cercle concerné</FormLabel>
                <EntityButtonComboboxController
                  circles
                  name="circleId"
                  control={control}
                />
                <FormErrorMessage>
                  {errors.circleId && errors.circleId.message}
                </FormErrorMessage>
              </FormControl>

              <Box textAlign="right">
                <Button colorScheme="blue" type="submit">
                  {activity ? 'Enregistrer' : 'Créer'}
                </Button>
              </Box>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
