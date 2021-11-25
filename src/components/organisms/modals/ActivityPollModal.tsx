import {
  activityPollSchema,
  createActivity,
  updateActivity,
} from '@api/entities/activities'
import { Timestamp } from '@api/firebase'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import MarkdownEditorController from '@components/atoms/MarkdownEditorController'
import { yupResolver } from '@hookform/resolvers/yup'
import { ActivityPoll, ActivityType } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

interface Props extends UseModalProps {
  threadId?: string // To create
  activity?: WithId<ActivityPoll> // To update
}

interface Values {
  question: string
  choices: string[] // Possible answers. Indexes are used as ids
  multiple: boolean
  minAnswers: number | null
  maxAnswers: number | null
  pointsPerUser: number // If multiple=true, user can dispatch points unevenly to multiple answers
  randomize: boolean
  anonymous: boolean
  hideUntilEnd: boolean
  canAddChoice: boolean
  endDate: Date | null
  endWhenAllVoted: boolean
}

const defaultValues: Values = {
  question: '',
  choices: [],
  multiple: false,
  minAnswers: null,
  maxAnswers: null,
  pointsPerUser: 1,
  randomize: false,
  anonymous: false,
  hideUntilEnd: false,
  canAddChoice: false,
  endDate: null,
  endWhenAllVoted: false,
}

export default function ActivityPollModal({
  threadId,
  activity,
  ...modalProps
}: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const orgId = useStoreState((state) => state.orgs.currentId)

  const defaultEndDate: Date = useMemo(
    () => activity?.endDate?.toDate() || new Date(),
    [activity]
  )

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(activityPollSchema),
    defaultValues: activity
      ? {
          ...activity,
          endDate: activity ? defaultEndDate : null,
        }
      : defaultValues,
  })

  const choices = watch('choices')
  const multiple = watch('multiple')
  const minAnswers = watch('minAnswers')
  const maxAnswers = watch('maxAnswers')

  useEffect(() => {
    if (!multiple) {
      setValue('minAnswers', null)
      setValue('maxAnswers', null)
    }
  }, [multiple])

  const onSubmit = handleSubmit(async ({ endDate, ...data }) => {
    if (!orgId || !userId) return
    try {
      const activityData = {
        endDate: endDate ? Timestamp.fromDate(endDate) : null,
        ...data,
      }
      if (activity) {
        await updateActivity(activity.id, activityData)
      } else if (threadId) {
        await createActivity({
          type: ActivityType.Poll,
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
          {activity ? 'Modifier un sondage' : 'Ajouter un sondage'}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={onSubmit}>
            <VStack spacing={5} align="stretch">
              <FormControl isInvalid={!!errors.question}>
                <FormLabel htmlFor="question">Question</FormLabel>
                <MarkdownEditorController
                  name="question"
                  placeholder="Qui ? Que ? Où ? Quand ?"
                  autoFocus
                  control={control}
                />
                <FormErrorMessage>{errors.question?.message}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <Stack spacing={1} direction="column">
                  <Checkbox {...register('multiple')}>
                    Choix multiples autorisés
                  </Checkbox>

                  {multiple && (
                    <Stack direction="row">
                      <Checkbox
                        isChecked={!!minAnswers}
                        onChange={() =>
                          setValue('minAnswers', minAnswers ? null : 1)
                        }
                      >
                        Minimum de choix à sélectionner
                      </Checkbox>
                      {minAnswers && (
                        <NumberInput
                          size="xs"
                          maxW={16}
                          min={1}
                          max={choices.length || 1}
                        >
                          <NumberInputField {...register('minAnswers')} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      )}
                    </Stack>
                  )}

                  {multiple && (
                    <Stack direction="row">
                      <Checkbox
                        isChecked={!!maxAnswers}
                        onChange={() =>
                          setValue(
                            'maxAnswers',
                            maxAnswers ? null : choices.length || 1
                          )
                        }
                      >
                        Maximum de choix à sélectionner
                      </Checkbox>
                      {maxAnswers && (
                        <NumberInput
                          size="xs"
                          maxW={16}
                          min={1}
                          max={choices.length || 1}
                        >
                          <NumberInputField {...register('maxAnswers')} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      )}
                    </Stack>
                  )}
                </Stack>
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
