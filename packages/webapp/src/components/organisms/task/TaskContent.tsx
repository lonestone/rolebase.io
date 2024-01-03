import CircleByIdButton from '@atoms/CircleByIdButton'
import CircleMemberLink from '@atoms/CircleMemberLink'
import Loading from '@atoms/Loading'
import Markdown from '@atoms/Markdown'
import MemberByIdButton from '@atoms/MemberByIdButton'
import Switch from '@atoms/Switch'
import SwitchController from '@atoms/SwitchController'
import TaskStatusTag from '@atoms/TaskStatusTag'
import { Title } from '@atoms/Title'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  BoxProps,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Spinner,
  Tag,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import {
  Task_Status_Enum,
  useTaskSubscription,
  useUpdateTaskMutation,
} from '@gql'
import { yupResolver } from '@hookform/resolvers/yup'
import useCircle from '@hooks/useCircle'
import useCircleParticipants from '@hooks/useCircleParticipants'
import useCreateTask from '@hooks/useCreateTask'
import useCurrentMember from '@hooks/useCurrentMember'
import useExtraParticipants from '@hooks/useExtraParticipants'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import { usePathInOrg } from '@hooks/usePathInOrg'
import { usePreventClose } from '@hooks/usePreventClose'
import useUpdateTaskStatus from '@hooks/useUpdateTaskStatus'
import ActionsMenu from '@molecules/ActionsMenu'
import EditorController from '@molecules/editor/EditorController'
import ParticipantsNumber from '@molecules/participants/ParticipantsNumber'
import CircleSearchInput from '@molecules/search/entities/circles/CircleSearchInput'
import MemberSearchInput from '@molecules/search/entities/members/MemberSearchInput'
import { TaskLogs } from '@molecules/task/TaskLogs'
import TaskStatusInput from '@molecules/task/TaskStatusInput'
import Page404 from '@pages/Page404'
import { nameSchema } from '@shared/schemas'
import { getDateTimeLocal } from '@utils/dates'
import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PrivacyIcon } from 'src/icons'
import settings from 'src/settings'
import * as yup from 'yup'
import TaskDeleteModal from './TaskDeleteModal'

interface Props extends BoxProps {
  id?: string
  changeTitle?: boolean
  defaultCircleId?: string
  defaultMemberId?: string
  defaultTitle?: string
  defaultDescription?: string
  defaultPrivate?: boolean
  headerIcons?: React.ReactNode
  onClose(): void
  onCreate?(taskId: string): void
}

interface Values {
  circleId: string
  memberId: string | null
  title: string
  description: string
  dueDate: string | null
  private: boolean
}

const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema.required(),
    circleId: yup.string().required(),
    description: yup.string(),
  })
)

export default function TaskContent({
  id,
  changeTitle,
  defaultCircleId,
  defaultMemberId,
  defaultTitle,
  defaultDescription,
  defaultPrivate,
  headerIcons,
  onClose,
  onCreate,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()
  const isMember = useOrgMember()
  const currentMember = useCurrentMember()
  const updateTaskStatus = useUpdateTaskStatus()
  const createTask = useCreateTask()
  const [updateTask] = useUpdateTaskMutation()
  const { preventClose, allowClose } = usePreventClose()

  const { data, loading, error } = useTaskSubscription({
    skip: !id,
    variables: {
      id: id!,
    },
  })
  const task = data?.task_by_pk
  const path = usePathInOrg(`tasks/${id}`)

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<Values>({
    resolver,
    defaultValues: {
      circleId: defaultCircleId || '',
      memberId: defaultMemberId || null,
      title: defaultTitle || '',
      description: defaultDescription || '',
      dueDate: null,
      private: defaultPrivate || false,
    },
  })

  // Reset form when task changes
  useEffect(() => {
    if (!task) return
    reset({
      circleId: task.circleId,
      memberId: task.memberId || null,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? getDateTimeLocal(new Date(task.dueDate)) : null,
      private: task.private,
    })
  }, [task])

  const dueDate = watch('dueDate')

  const onSubmit = handleSubmit(async ({ dueDate, memberId, ...data }) => {
    if (!orgId || !currentMember) return
    const taskUpdate = {
      ...data,
      memberId: memberId ?? null,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    }
    if (id) {
      // Update task
      await updateTask({
        variables: { id, values: taskUpdate },
      })
      allowClose()
    } else {
      // Create task
      const newTask = await createTask({
        orgId,
        status: Task_Status_Enum.Open,
        ...taskUpdate,
      })
      if (!newTask) return

      onCreate?.(newTask.id)
      onClose()
    }
  })

  // Save after X seconds
  const watchedData = watch()
  const onSubmitDebounced = useMemo(
    () => debounce(onSubmit, 2000),
    [id, orgId, currentMember]
  )
  useEffect(() => {
    if (!id || !isDirty || !isPrivateAllowed) return
    preventClose()
    onSubmitDebounced()
  }, [id, isDirty, ...Object.values(watchedData)])

  // Get circle and participants
  const circle = useCircle(watchedData.circleId)
  const circleParticipants = useCircleParticipants(circle)
  const allParticipants = useExtraParticipants(
    circleParticipants,
    watchedData.memberId ? [watchedData.memberId] : []
  )
  const isPrivateAllowed =
    !watchedData.private ||
    allParticipants.some((p) => p.member.id === currentMember?.id)

  // Toggle due date
  const handleToggleDueDate = useCallback(() => {
    if (dueDate) {
      setValue('dueDate', null, { shouldDirty: true })
    } else {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      date.setHours(12, 0, 0, 0)
      setValue('dueDate', getDateTimeLocal(date), { shouldDirty: true })
    }
  }, [dueDate])

  // Change task status
  const handleChangeStatus = useCallback(
    (status: Task_Status_Enum) => {
      if (!task) return
      updateTaskStatus(task, status)
    },
    [task, updateTaskStatus]
  )

  // Task deletion modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  if (error || (id && !task && !loading)) {
    console.error(error || new Error('Task not found'))
    return <Page404 />
  }

  return (
    <Box {...boxProps}>
      {changeTitle && <Title>{task?.title || '…'}</Title>}

      <Flex align="center" mb={5}>
        <Heading as="h1" size="md">
          {t(id ? 'TaskContent.headingEdit' : 'TaskContent.headingCreate')}
        </Heading>

        {task &&
          (isMember ? (
            <TaskStatusInput
              value={task.status}
              onChange={handleChangeStatus}
              ml={5}
              size="lg"
            />
          ) : (
            <TaskStatusTag status={task.status} ml={5} size="lg" />
          ))}

        {task?.archived && <Tag ml={2}>{t('common.archived')}</Tag>}

        {id && isDirty && isPrivateAllowed && (
          <Spinner size="xs" color="gray" ml={5} />
        )}

        <Spacer />

        {task?.private && (
          <Tooltip
            label={t('TaskContent.privateTooltip', { role: circle?.role.name })}
            hasArrow
            mr={2}
          >
            <PrivacyIcon size={20} />
          </Tooltip>
        )}

        <Flex mr={headerIcons ? -3 : 0}>
          {id && isMember && (
            <ActionsMenu
              ml={3}
              copyLinkUrl={`${settings.url}${path}`}
              onDelete={onDeleteOpen}
            />
          )}

          {headerIcons}
        </Flex>
      </Flex>

      {id && loading && <Loading active size="md" />}

      <VStack spacing={10} alignItems="start" mb={3}>
        <FormControl isInvalid={!!errors.title}>
          <Input
            {...register('title')}
            size="lg"
            placeholder={t('TaskContent.titlePlaceholder')}
            autoFocus
            readOnly={!isMember}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel>{t('TaskContent.description')}</FormLabel>
          {isMember ? (
            <EditorController
              name="description"
              placeholder={t('TaskContent.notes')}
              control={control}
            />
          ) : (
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Markdown>{field.value}</Markdown>}
            />
          )}
        </FormControl>

        <Flex flexWrap="wrap">
          <FormControl isInvalid={!!errors.circleId} w="auto" mr={5}>
            <FormLabel>{t('TaskContent.circle')}</FormLabel>
            <Controller
              name="circleId"
              control={control}
              render={({ field }) =>
                isMember ? (
                  <CircleSearchInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                ) : (
                  <CircleByIdButton id={field.value} />
                )
              }
            />
          </FormControl>

          <FormControl isInvalid={!!errors.memberId} w="auto">
            <FormLabel>{t('TaskContent.memberId')}</FormLabel>
            <Controller
              name="memberId"
              control={control}
              render={({ field }) =>
                isMember ? (
                  <MemberSearchInput
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                    onClear={() => field.onChange(null)}
                  />
                ) : field.value ? (
                  <CircleMemberLink memberId={field.value}>
                    <MemberByIdButton id={field.value} size="sm" />
                  </CircleMemberLink>
                ) : (
                  <></>
                )
              }
            />
          </FormControl>
        </Flex>

        <VStack spacing={3} align="start">
          <FormControl>
            <Switch
              isChecked={!!dueDate}
              isReadOnly={!isMember}
              onChange={handleToggleDueDate}
            >
              {t('TaskContent.dueDate')}
            </Switch>
            <Collapse in={!!dueDate}>
              <Box mt={5} pl={10}>
                <Input
                  {...register('dueDate')}
                  type="datetime-local"
                  size="sm"
                  w="250px"
                  readOnly={!isMember}
                />
              </Box>
            </Collapse>
          </FormControl>

          <FormControl>
            <SwitchController
              name="private"
              control={control}
              isReadOnly={!isMember}
            >
              {t('TaskContent.private')}
              <ParticipantsNumber
                participants={allParticipants}
                opacity={watchedData.private ? 1 : 0.4}
                ml={2}
              />
            </SwitchController>
            <Collapse in={watchedData.private}>
              <FormHelperText ml="40px" mb={2}>
                {t('TaskContent.privateHelp', {
                  role: circle?.role.name,
                })}
              </FormHelperText>
            </Collapse>
          </FormControl>
        </VStack>

        <Collapse in={!isPrivateAllowed}>
          <Alert status="warning">
            <AlertIcon />
            <AlertDescription>
              {t('TaskContent.privateNotAllowed', {
                role: circle?.role.name,
              })}
            </AlertDescription>
          </Alert>
        </Collapse>

        {id && (
          <TaskLogs
            taskId={id}
            header={
              <Heading as="h2" size="md" mt={10} mb={2}>
                {t('TaskContent.logs')}
              </Heading>
            }
          />
        )}
        {!id && isMember && (
          <Box w="100%" textAlign="right">
            <Button
              colorScheme="blue"
              isDisabled={!isPrivateAllowed}
              onClick={onSubmit}
            >
              {t('common.create')}
            </Button>
          </Box>
        )}
      </VStack>

      {isDeleteOpen && task && (
        <TaskDeleteModal
          task={task}
          isOpen
          onClose={onDeleteClose}
          onDelete={onClose}
        />
      )}
    </Box>
  )
}
