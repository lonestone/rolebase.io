import SwitchController from '@atoms/SwitchController'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import {
  DecisionFragment,
  useCreateDecisionMutation,
  useUpdateDecisionMutation,
} from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import useCircle from '@hooks/useCircle'
import useCircleParticipants from '@hooks/useCircleParticipants'
import useCreateLog from '@hooks/useCreateLog'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import CircleFormController from '@molecules/circle/CircleFormController'
import EditorController from '@molecules/editor/EditorController'
import ParticipantsNumber from '@molecules/participants/ParticipantsNumber'
import { EntityChangeType, LogType } from '@shared/model/log'
import { nameSchema } from '@shared/schemas'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Props extends UseModalProps {
  defaultCircleId?: string
  defaultTitle?: string
  defaultDescription?: string
  defaultPrivate?: boolean
  decision?: DecisionFragment
  onCreate?(id: string): void
}

interface Values {
  title: string
  description: string
  circleId: string
  private: boolean
}

const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema.required(),
    circleId: yup.string().required(),
  })
)

export default function DecisionEditModal({
  defaultCircleId,
  defaultTitle,
  defaultDescription,
  defaultPrivate,
  decision,
  onCreate,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const [createDecision] = useCreateDecisionMutation()
  const [updateDecision] = useUpdateDecisionMutation()
  const createLog = useCreateLog()

  const defaultValues = decision
    ? {
        title: decision.title,
        description: decision.description,
        circleId: decision.circleId,
        private: decision.private,
      }
    : {
        title: defaultTitle || '',
        description: defaultDescription || '',
        circleId: defaultCircleId || '',
        private: defaultPrivate || false,
      }

  const formMethods = useForm<Values>({
    resolver,
    defaultValues,
  })
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = formMethods

  // Watch selected circle
  const circleId = watch('circleId')
  const circle = useCircle(circleId)
  const participants = useCircleParticipants(circle)

  // Watch privacy field
  const isPrivate = watch('private')
  const isPrivateAllowed =
    !isPrivate || participants.some((p) => p.member.id === currentMember?.id)

  const onSubmit = handleSubmit(async (values) => {
    if (!orgId || !currentMember) return
    if (decision) {
      // Update decision
      await updateDecision({ variables: { id: decision.id, values } })

      // Log
      createLog({
        display: {
          type: LogType.DecisionUpdate,
          id: decision.id,
          name: decision.title,
        },
        changes: {
          decisions: [
            {
              type: EntityChangeType.Update,
              id: decision.id,
              prevData: defaultValues,
              newData: values,
            },
          ],
        },
      })
    } else {
      // Create decision
      const { data } = await createDecision({
        variables: {
          values: {
            orgId,
            memberId: currentMember.id,
            ...values,
          },
        },
      })
      const newDecision = data?.insert_decision_one
      if (!newDecision) return

      // Log
      createLog({
        display: {
          type: LogType.DecisionCreate,
          id: newDecision.id,
          name: newDecision.title,
        },
        changes: {
          decisions: [
            {
              type: EntityChangeType.Create,
              id: newDecision.id,
              data: newDecision,
            },
          ],
        },
      })

      onCreate?.(newDecision.id)
    }
    modalProps.onClose()
  })

  return (
    <FormProvider {...formMethods}>
      <Modal size="xl" {...modalProps}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>
              {t(
                decision
                  ? 'DecisionEditModal.headingEdit'
                  : 'DecisionEditModal.headingCreate'
              )}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing={5} align="stretch">
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel>{t('DecisionEditModal.title')}</FormLabel>
                  <Input
                    {...register('title')}
                    placeholder={t('DecisionEditModal.titlePlaceholder')}
                    autoFocus
                  />
                </FormControl>

                <CircleFormController />

                <FormControl isInvalid={!!errors.description}>
                  <FormLabel>{t('DecisionEditModal.description')}</FormLabel>
                  <EditorController
                    name="description"
                    placeholder={t('DecisionEditModal.descriptionPlaceholder')}
                    control={control}
                  />
                </FormControl>

                <FormControl>
                  <SwitchController name="private" control={control}>
                    {t('DecisionEditModal.private')}
                    <ParticipantsNumber
                      participants={participants}
                      opacity={isPrivate ? 1 : 0.4}
                      ml={2}
                    />
                  </SwitchController>
                  <Collapse in={isPrivate}>
                    <FormHelperText ml="40px" mb={2}>
                      {t('DecisionEditModal.privateHelp', {
                        role: circle?.role.name,
                      })}
                    </FormHelperText>
                  </Collapse>
                </FormControl>

                <Collapse in={!isPrivateAllowed}>
                  <Alert status="warning">
                    <AlertIcon />
                    <AlertDescription>
                      {t('DecisionEditModal.privateNotAllowed', {
                        role: circle?.role.name,
                      })}
                    </AlertDescription>
                  </Alert>
                </Collapse>

                <Box textAlign="right" mt={2}>
                  <Button
                    colorScheme="blue"
                    type="submit"
                    isDisabled={!isPrivateAllowed}
                  >
                    {t(decision ? 'common.save' : 'common.create')}
                  </Button>
                </Box>
              </VStack>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </FormProvider>
  )
}
