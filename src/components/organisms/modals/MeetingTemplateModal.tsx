import {
  createMeetingTemplate,
  updateMeetingTemplate,
} from '@api/entities/meetingTemplates'
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
import MeetingStepsConfigController, {
  stepsConfigSchema,
  StepsValues,
} from '@components/molecules/MeetingStepsConfigController'
import { yupResolver } from '@hookform/resolvers/yup'
import { useOrgId } from '@hooks/useOrgId'
import { MeetingTempalteEntry } from '@shared/meetingTemplate'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

interface Props extends UseModalProps {
  meetingTemplate?: MeetingTempalteEntry
}

interface Values extends StepsValues {
  title: string
}

const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema,
    stepsConfig: stepsConfigSchema,
  })
)

export default function MeetingTemplateModal({
  meetingTemplate,
  ...modalProps
}: Props) {
  const orgId = useOrgId()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<Values>({
    resolver,
    defaultValues: meetingTemplate
      ? {
          title: meetingTemplate.title,
          stepsConfig: meetingTemplate.stepsConfig,
        }
      : {
          title: '',
          stepsConfig: [],
        },
  })

  // Submit
  const onSubmit = handleSubmit(async (meetingUpdate) => {
    if (!orgId) return
    if (meetingTemplate) {
      // Update meeting
      await updateMeetingTemplate(meetingTemplate.id, meetingUpdate)
    } else {
      // Create meeting
      await createMeetingTemplate({
        orgId,
        ...meetingUpdate,
      })
    }
    modalProps.onClose()
  })

  return (
    <Modal size="xl" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>
            {meetingTemplate
              ? 'Modifier un template de réunion'
              : 'Nouveau template de réunion'}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isInvalid={!!errors.title}>
                <FormLabel>Titre</FormLabel>
                <Input
                  {...register('title')}
                  placeholder="Titre..."
                  autoFocus
                />
              </FormControl>

              <FormControl>
                <FormLabel>Déroulé</FormLabel>
                <MeetingStepsConfigController
                  control={control as any}
                  errors={errors}
                />
              </FormControl>

              <Box textAlign="right" mt={2}>
                <Button colorScheme="blue" type="submit">
                  {meetingTemplate ? 'Enregistrer' : 'Créer'}
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
}
