import { createDecision, updateDecision } from '@api/entities/decisions'
import { nameSchema } from '@api/schemas'
import {
  Box,
  Button,
  FormControl,
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
import EditorController from '@components/molecules/editor/EditorController'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import { DecisionEntry } from '@shared/model/decision'
import { EntityChangeType, LogType } from '@shared/model/log'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Props extends UseModalProps {
  defaultCircleId?: string
  defaultTitle?: string
  defaultDescription?: string
  decision?: DecisionEntry
  onCreate?(id: string): void
}

interface Values {
  title: string
  description: string
  circleId: string
}

const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema,
    circleId: yup.string().required(),
  })
)

export default function DecisionEditModal({
  defaultCircleId,
  defaultTitle,
  defaultDescription,
  decision,
  onCreate,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const createLog = useCreateLog()

  const defaultValues = decision
    ? {
        title: decision.title,
        description: decision.description,
        circleId: decision.circleId,
      }
    : {
        title: defaultTitle || '',
        description: defaultDescription || '',
        circleId: defaultCircleId || '',
      }

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<Values>({
    resolver,
    defaultValues,
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!orgId || !currentMember) return
    if (decision) {
      // Update decision
      await updateDecision(decision.id, values)

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
      const newDecision = await createDecision({
        orgId,
        memberId: currentMember.id,
        ...values,
      })

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

              <FormControl isInvalid={!!errors.circleId}>
                <FormLabel>{t('DecisionEditModal.circle')}</FormLabel>
                <Controller
                  name="circleId"
                  control={control}
                  render={({ field }) => (
                    <CircleSearchInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.description}>
                <FormLabel>{t('DecisionEditModal.description')}</FormLabel>
                <EditorController
                  name="description"
                  placeholder={t('DecisionEditModal.descriptionPlaceholder')}
                  control={control}
                />
              </FormControl>

              <Box textAlign="right" mt={2}>
                <Button colorScheme="blue" type="submit">
                  {t(decision ? 'common.save' : 'common.create')}
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}
