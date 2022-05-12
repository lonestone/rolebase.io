import { createActivity, updateActivity } from '@api/entities/activities'
import { pollAnswersEntities } from '@api/entities/pollAnswers'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import NumberInputController from '@components/atoms/NumberInputController'
import SimpleEditorController from '@components/molecules/editor/EditorController'
import { yupResolver } from '@hookform/resolvers/yup'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import { ActivityPoll, ActivityType, PollChoice } from '@shared/model/activity'
import { WithId } from '@shared/model/types'
import { useStoreState } from '@store/hooks'
import { Timestamp } from 'firebase/firestore'
import React, { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FiHelpCircle, FiPlus, FiX } from 'react-icons/fi'
import { getDateTimeLocal } from 'src/utils'
import * as yup from 'yup'

interface Props extends UseModalProps {
  threadId?: string // To create
  activity?: WithId<ActivityPoll> // To update
}

interface Values {
  question: string
  choices: PollChoice[] // Possible answers. Indexes are used as ids
  multiple: boolean
  minAnswers: number | null
  maxAnswers: number | null
  pointsPerUser: number | null
  randomize: boolean
  anonymous: boolean
  hideUntilEnd: boolean
  canAddChoice: boolean
  endDate: string | null
  endWhenAllVoted: boolean
}

const defaultValues: Values = {
  question: '',
  choices: [{ title: '' }, { title: '' }],
  multiple: false,
  minAnswers: null,
  maxAnswers: null,
  pointsPerUser: null,
  randomize: false,
  anonymous: false,
  hideUntilEnd: false,
  canAddChoice: false,
  endDate: null,
  endWhenAllVoted: false,
}

const resolver = yupResolver(
  yup.object().shape({
    question: yup.string().required(),
    choices: yup.array().of(
      yup.object().shape({
        title: yup.string().required(),
      })
    ),
  })
)

export default function ActivityPollModal({
  threadId,
  activity,
  ...modalProps
}: Props) {
  const { t } = useTranslation()
  const userId = useStoreState((state) => state.auth.user?.id)
  const orgId = useOrgId()

  // Answers
  const [acceptErasingAnswers, setAcceptErasingAnswers] = useState(false)
  const { deletePollAnswer, subscribePollAnswers } = activity
    ? pollAnswersEntities(activity.id)
    : {
        deletePollAnswer: () => {},
        subscribePollAnswers: undefined,
      }
  const { data: answers } = useSubscription(subscribePollAnswers?.())
  const hasAnswers = (answers?.length || 0) > 0
  const shouldAcceptErasingAnswers = !acceptErasingAnswers && hasAnswers

  const defaultEndDate = useMemo(
    () => getDateTimeLocal(activity?.endDate?.toDate() || new Date()),
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
    resolver,
    defaultValues: activity
      ? {
          question: activity.question,
          choices: activity.choices,
          multiple: activity.multiple,
          minAnswers: activity.minAnswers,
          maxAnswers: activity.maxAnswers,
          pointsPerUser: activity.pointsPerUser,
          randomize: activity.randomize,
          anonymous: activity.anonymous,
          hideUntilEnd: activity.hideUntilEnd,
          canAddChoice: activity.canAddChoice,
          endDate: activity?.endDate
            ? getDateTimeLocal(activity.endDate.toDate())
            : null,
          endWhenAllVoted: activity.endWhenAllVoted,
        }
      : defaultValues,
  })

  // Choices
  const {
    fields: choicesFields,
    append: appendChoice,
    remove: removeChoice,
  } = useFieldArray({
    control,
    name: 'choices',
  })

  // Multiple choices
  const multiple = watch('multiple')
  const minAnswers = watch('minAnswers')
  const maxAnswers = watch('maxAnswers')
  const pointsPerUser = watch('pointsPerUser')
  useEffect(() => {
    if (!multiple) {
      setValue('minAnswers', null)
      setValue('maxAnswers', null)
      setValue('canAddChoice', false)
      setValue('pointsPerUser', null)
    }
  }, [multiple])

  const endDate = watch('endDate')

  const onSubmit = handleSubmit(async ({ endDate, ...data }) => {
    if (!orgId || !userId) return
    try {
      const activityData = {
        endDate: endDate ? Timestamp.fromDate(new Date(endDate)) : null,
        ...data,
      }
      if (activity) {
        // Erase answers
        for (const answer of answers || []) {
          await deletePollAnswer(answer.id)
        }
        // Update poll
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
          <Flex alignItems="center">
            {t(
              activity
                ? 'organisms.modals.ActivityPollModal.headingEdit'
                : 'organisms.modals.ActivityPollModal.headingCreate'
            )}

            {!activity && (
              <Tooltip
                hasArrow
                p={3}
                label={t('organisms.modals.ActivityPollModal.help')}
              >
                <Box ml={3}>
                  <FiHelpCircle />
                </Box>
              </Tooltip>
            )}
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={onSubmit}>
            <VStack spacing={5} align="stretch">
              {hasAnswers && (
                <>
                  <Alert status="warning">
                    <AlertIcon />
                    {t('organisms.modals.ActivityPollModal.resetNeeded')}
                  </Alert>
                  <Checkbox
                    isChecked={acceptErasingAnswers}
                    onChange={() =>
                      setAcceptErasingAnswers(!acceptErasingAnswers)
                    }
                  >
                    {t('organisms.modals.ActivityPollModal.resetBtn')}
                  </Checkbox>
                </>
              )}

              <FormControl isInvalid={!!errors.question}>
                <FormLabel>
                  {t('organisms.modals.ActivityPollModal.question')}
                </FormLabel>
                <SimpleEditorController
                  name="question"
                  placeholder={t(
                    'organisms.modals.ActivityPollModal.questionPlaceholder'
                  )}
                  autoFocus
                  control={control}
                />
              </FormControl>

              <Box>
                <FormLabel>
                  {t('organisms.modals.ActivityPollModal.choices')}
                </FormLabel>
                <Stack spacing={2}>
                  {choicesFields.map((field, index) => (
                    <FormControl
                      isInvalid={!!errors.choices?.[index]}
                      key={field.id}
                    >
                      <Stack spacing={2} direction="row">
                        <Input
                          {...register(`choices.${index}.title`)}
                          placeholder={t(
                            'organisms.modals.ActivityPollModal.choicePlacholder',
                            { n: index + 1 }
                          )}
                        />
                        {choicesFields.length > 2 ? (
                          <IconButton
                            aria-label=""
                            variant="ghost"
                            icon={<FiX />}
                            onClick={() => removeChoice(index)}
                          />
                        ) : null}
                      </Stack>
                    </FormControl>
                  ))}
                  <Button
                    leftIcon={<FiPlus />}
                    onClick={() => appendChoice({ title: '' })}
                  >
                    {t('organisms.modals.ActivityPollModal.addChoice')}
                  </Button>
                </Stack>
              </Box>

              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Text textAlign="left">
                      {t('organisms.modals.ActivityPollModal.options')}
                    </Text>
                    <AccordionIcon ml={2} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Stack spacing={1}>
                      <Checkbox {...register('multiple')}>
                        {t('organisms.modals.ActivityPollModal.multiple')}
                      </Checkbox>
                      {multiple && (
                        <Stack spacing={1} pl={6}>
                          <Stack direction="row">
                            <Checkbox
                              isChecked={!!minAnswers}
                              onChange={() =>
                                setValue('minAnswers', minAnswers ? null : 2)
                              }
                            >
                              {t(
                                'organisms.modals.ActivityPollModal.minAnswers'
                              )}
                            </Checkbox>
                            {minAnswers && (
                              <NumberInputController
                                name="minAnswers"
                                control={control}
                                size="xs"
                                maxW={16}
                                min={2}
                                max={choicesFields.length}
                              />
                            )}
                          </Stack>

                          <Stack direction="row">
                            <Checkbox
                              isChecked={!!maxAnswers}
                              onChange={() =>
                                setValue(
                                  'maxAnswers',
                                  maxAnswers ? null : choicesFields.length
                                )
                              }
                            >
                              {t(
                                'organisms.modals.ActivityPollModal.maxAnswers'
                              )}
                            </Checkbox>
                            {maxAnswers && (
                              <NumberInputController
                                name="maxAnswers"
                                control={control}
                                size="xs"
                                maxW={16}
                                min={2}
                                max={choicesFields.length}
                              />
                            )}
                          </Stack>

                          <Stack direction="row">
                            <Checkbox
                              isChecked={!!pointsPerUser}
                              onChange={() =>
                                setValue(
                                  'pointsPerUser',
                                  pointsPerUser === null ? 2 : null
                                )
                              }
                            >
                              {t('organisms.modals.ActivityPollModal.points')}
                            </Checkbox>
                            {pointsPerUser && (
                              <NumberInputController
                                name="pointsPerUser"
                                control={control}
                                size="xs"
                                maxW={16}
                                min={2}
                              />
                            )}
                          </Stack>
                        </Stack>
                      )}

                      {/*
                      <Checkbox {...register('canAddChoice')}>
                        {t('organisms.modals.ActivityPollModal.canAddChoices')}
                      </Checkbox>
                      */}
                      <Checkbox {...register('anonymous')}>
                        {t('organisms.modals.ActivityPollModal.anonymous')}
                      </Checkbox>
                      <Checkbox {...register('randomize')}>
                        {t('organisms.modals.ActivityPollModal.randomize')}
                      </Checkbox>
                      <Checkbox {...register('hideUntilEnd')}>
                        {t('organisms.modals.ActivityPollModal.hideUntilEnd')}
                      </Checkbox>

                      <Checkbox {...register('endWhenAllVoted')}>
                        {t(
                          'organisms.modals.ActivityPollModal.endWhenAllVoted'
                        )}
                      </Checkbox>
                      <Checkbox
                        isChecked={!!endDate}
                        onChange={() =>
                          setValue('endDate', endDate ? null : defaultEndDate)
                        }
                      >
                        {t('organisms.modals.ActivityPollModal.endDate')}
                      </Checkbox>
                      {endDate ? (
                        <Box pl={6}>
                          <Input
                            {...register('endDate')}
                            type="datetime-local"
                            size="sm"
                            maxW="250px"
                          />
                        </Box>
                      ) : null}
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Box textAlign="right">
                <Button
                  colorScheme="blue"
                  type="submit"
                  isDisabled={shouldAcceptErasingAnswers}
                >
                  {t(activity ? 'common.save' : 'common.create')}
                </Button>
              </Box>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
