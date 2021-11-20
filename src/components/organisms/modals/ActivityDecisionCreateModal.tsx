import {
  activityDecisionSchema,
  createActivity,
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
import CircleComboboxController from '@components/molecules/search/CircleComboboxController'
import { yupResolver } from '@hookform/resolvers/yup'
import { ActivityType } from '@shared/activity'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'

interface Props extends UseModalProps {
  threadId: string
  circleId?: string
}

interface Values {
  circleId: string
  decision: string
  explanation: string
}

export default function ActivityDecisionCreateModal({
  threadId,
  circleId,
  ...modalProps
}: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const orgId = useStoreState((state) => state.orgs.currentId)

  const { handleSubmit, control, errors } = useForm<Values>({
    resolver: yupResolver(activityDecisionSchema),
    defaultValues: {
      circleId: circleId || '',
      decision: '',
      explanation: '',
    },
  })

  const onSubmit = handleSubmit(async ({ circleId, decision, explanation }) => {
    if (!orgId || !userId) return
    try {
      await createActivity({
        orgId,
        userId,
        threadId,
        type: ActivityType.Decision,
        circleId,
        decision,
        explanation,
      })
      modalProps.onClose()
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <Modal size="2xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter une décision</ModalHeader>
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
                <CircleComboboxController name="circleId" control={control} />
                <FormErrorMessage>
                  {errors.circleId && errors.circleId.message}
                </FormErrorMessage>
              </FormControl>

              <Box textAlign="right">
                <Button colorScheme="blue" type="submit">
                  Créer
                </Button>
              </Box>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
