import { createActivity, updateActivity } from '@api/entities/activities'
import {
  Box,
  Button,
  FormControl,
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
import * as yup from 'yup'

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

const resolver = yupResolver(
  yup.object().shape({
    circleId: yup.string().required(),
    decision: yup.string().required(),
    explanation: yup.string(),
  })
)

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
    resolver,
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
                <FormLabel>Décision</FormLabel>
                <MarkdownEditorController
                  name="decision"
                  placeholder="Qu'avez-vous décidé ?"
                  autoFocus
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.explanation}>
                <FormLabel>Explications</FormLabel>
                <MarkdownEditorController
                  name="explanation"
                  placeholder="Pourquoi avez-vous pris cette décision ?"
                  control={control}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.circleId}>
                <FormLabel>Cercle / Rôle</FormLabel>
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
