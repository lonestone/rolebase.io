import {
  activityDecisionSchema,
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
import EntityButtonCombobox from '@components/molecules/search/EntityButtonCombobox'
import { yupResolver } from '@hookform/resolvers/yup'
import { ActivityDecision, ActivityType } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props extends UseModalProps {
  threadId?: string // To create
  circleId?: string // To create
  activity?: WithId<ActivityDecision> // To update
}

interface Values {
  circleId: string
  decision: string
  explanation: string
}

export default function ActivityDecisionModal({
  threadId,
  circleId,
  activity,
  ...modalProps
}: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const orgId = useStoreState((state) => state.orgs.currentId)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(activityDecisionSchema),
    defaultValues: activity
      ? {
          circleId: activity.circleId,
          decision: activity.decision,
          explanation: activity.explanation,
        }
      : {
          circleId: circleId || '',
          decision: '',
          explanation: '',
        },
  })

  const onSubmit = handleSubmit(async ({ circleId, decision, explanation }) => {
    if (!orgId || !userId) return
    try {
      const activityData = {
        circleId,
        decision,
        explanation,
      }
      if (activity) {
        await updateActivity(activity.id, activityData)
      } else if (threadId) {
        await createActivity({
          type: ActivityType.Decision,
          orgId,
          userId,
          threadId,
          ...activityData,
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
                <FormErrorMessage>{errors.decision?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.explanation}>
                <FormLabel htmlFor="explanation">Explications</FormLabel>
                <MarkdownEditorController
                  name="explanation"
                  placeholder="Pourquoi avez-vous pris cette décision ?"
                  control={control}
                />
                <FormErrorMessage>
                  {errors.explanation?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.circleId}>
                <FormLabel htmlFor="circleId">Cercle concerné</FormLabel>
                <Controller
                  name="circleId"
                  control={control}
                  render={({ field }) => (
                    <EntityButtonCombobox
                      circles
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <FormErrorMessage>{errors.circleId?.message}</FormErrorMessage>
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
