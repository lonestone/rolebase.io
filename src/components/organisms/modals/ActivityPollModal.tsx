import {
  activityPollSchema,
  createActivity,
  updateActivity,
} from '@api/entities/activities'
import { Timestamp } from '@api/firebase'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
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
  UseModalProps,
  VStack,
} from '@chakra-ui/react'
import MarkdownEditorController from '@components/atoms/MarkdownEditorController'
import NumberInputController from '@components/atoms/NumberInputController'
import { yupResolver } from '@hookform/resolvers/yup'
import { ActivityPoll, ActivityType, PollChoice } from '@shared/activity'
import { WithId } from '@shared/types'
import { useStoreState } from '@store/hooks'
import React, { useEffect, useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { getDateTimeLocal } from 'src/utils'

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

export default function ActivityPollModal({
  threadId,
  activity,
  ...modalProps
}: Props) {
  const userId = useStoreState((state) => state.auth.user?.id)
  const orgId = useStoreState((state) => state.orgs.currentId)

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
    resolver: yupResolver(activityPollSchema),
    defaultValues: activity
      ? {
          ...activity,
          endDate: activity?.endDate
            ? getDateTimeLocal(activity.endDate.toDate())
            : null,
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
                  placeholder="Qui, que, où, quand ?"
                  autoFocus
                  control={control}
                />
                <FormErrorMessage>{errors.question?.message}</FormErrorMessage>
              </FormControl>

              <Box>
                <FormLabel>Choix</FormLabel>
                <Stack spacing={2}>
                  {choicesFields.map((field, index) => (
                    <FormControl
                      isInvalid={!!errors.choices?.[index]}
                      key={field.id}
                    >
                      <Stack spacing={2} direction="row">
                        <Input
                          {...register(`choices.${index}.title`)}
                          placeholder={`Choix n°${index + 1}`}
                          control={control}
                        />
                        {choicesFields.length > 2 ? (
                          <IconButton
                            aria-label=""
                            icon={<CloseIcon />}
                            onClick={() => removeChoice(index)}
                          />
                        ) : null}
                      </Stack>
                    </FormControl>
                  ))}
                  <Button
                    icon={AddIcon}
                    onClick={() => appendChoice({ title: '' })}
                  >
                    Ajouter un choix
                  </Button>
                </Stack>
              </Box>

              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Text textAlign="left">Options</Text>
                    <AccordionIcon ml={2} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Stack spacing={1}>
                      <Checkbox {...register('multiple')}>
                        Choix multiples
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
                              Minimum de choix à sélectionner
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
                              Maximum de choix sélectionnables
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
                              Points à répartir
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

                          <Checkbox {...register('canAddChoice')}>
                            Autoriser les participants à rajouter des choix
                          </Checkbox>
                        </Stack>
                      )}

                      <Checkbox {...register('anonymous')}>
                        Réponses anonymes
                      </Checkbox>
                      <Checkbox {...register('randomize')}>
                        Afficher les choix dans un ordre aléatoire
                      </Checkbox>
                      <Checkbox {...register('hideUntilEnd')}>
                        Cacher les résultats jusqu'à la clôture
                      </Checkbox>

                      <Checkbox {...register('endWhenAllVoted')}>
                        Clôturer quand tous les participants ont voté
                      </Checkbox>
                      <Checkbox
                        isChecked={!!endDate}
                        onChange={() =>
                          setValue('endDate', endDate ? null : defaultEndDate)
                        }
                      >
                        Date de clôture
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
