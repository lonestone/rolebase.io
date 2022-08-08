import { createTask, subscribeTask, updateTask } from '@api/entities/tasks'
import { nameSchema } from '@api/schemas'
import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Spinner,
  Tag,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import Loading from '@components/atoms/Loading'
import Markdown from '@components/atoms/Markdown'
import MemberByIdButton from '@components/atoms/MemberByIdButton'
import TaskStatusTag from '@components/atoms/TaskStatusTag'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import ActionsMenu from '@components/molecules/ActionsMenu'
import DateInfo from '@components/molecules/DateInfo'
import EditorController from '@components/molecules/editor/EditorController'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import MemberSearchInput from '@components/molecules/search/entities/members/MemberSearchInput'
import TaskStatusInput from '@components/molecules/TaskStatusInput'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import { usePreventClose } from '@hooks/usePreventClose'
import useSubscription from '@hooks/useSubscription'
import useUpdateTaskStatus from '@hooks/useUpdateTaskStatus'
import { EntityChangeType, LogType } from '@shared/model/log'
import { TaskStatus } from '@shared/model/task'
import { Timestamp } from 'firebase/firestore'
import debounce from 'lodash.debounce'
import React, { useCallback, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getDateTimeLocal } from 'src/utils'
import * as yup from 'yup'
import TaskDeleteModal from './TaskDeleteModal'

interface Props extends BoxProps {
  id?: string
  changeTitle?: boolean
  defaultCircleId?: string
  defaultMemberId?: string
  defaultTitle?: string
  defaultDescription?: string
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
}

const resolver = yupResolver(
  yup.object().shape({
    title: nameSchema,
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
  headerIcons,
  onClose,
  onCreate,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const createLog = useCreateLog()
  const orgId = useOrgId()
  const isMember = useOrgMember()
  const currentMember = useCurrentMember()
  const updateTaskStatus = useUpdateTaskStatus()
  const { preventClose, allowClose } = usePreventClose()

  // Subscribe task
  const {
    data: task,
    loading,
    error,
  } = useSubscription(id ? subscribeTask(id) : undefined)

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
      dueDate: task.dueDate ? getDateTimeLocal(task.dueDate.toDate()) : null,
    })
  }, [task])

  const dueDate = watch('dueDate')

  const onSubmit = handleSubmit(async ({ dueDate, memberId, ...data }) => {
    if (!orgId || !currentMember) return
    const taskUpdate = {
      ...data,
      memberId: memberId ?? null,
      dueDate: dueDate ? Timestamp.fromDate(new Date(dueDate)) : null,
    }
    if (id) {
      // Update task
      await updateTask(id, taskUpdate)
      allowClose()
    } else {
      // Create task
      const newTask = await createTask({
        orgId,
        ...taskUpdate,
      })

      createLog({
        display: {
          type: LogType.TaskCreate,
          id: newTask.id,
          name: newTask.title,
        },
        changes: {
          tasks: [
            { type: EntityChangeType.Create, id: newTask.id, data: newTask },
          ],
        },
      })

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
    if (!id || !isDirty) return
    preventClose()
    onSubmitDebounced()
  }, [id, isDirty, ...Object.values(watchedData)])

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
    (status: TaskStatus) => {
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

        {id && isDirty && <Spinner size="xs" color="gray" ml={5} />}

        <Spacer />

        <Flex mr={headerIcons ? -3 : 0}>
          {id && isMember && <ActionsMenu ml={3} onDelete={onDeleteOpen} />}

          {headerIcons}
        </Flex>
      </Flex>

      {id && loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <VStack spacing={5} alignItems="start" mb={3}>
        <FormControl isInvalid={!!errors.title}>
          <Input
            {...register('title')}
            placeholder={t('TaskContent.titlePlaceholder')}
            autoFocus
            readOnly={!isMember}
          />
        </FormControl>

        {task && <DateInfo date={task.createdAt.toDate()} />}

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
                  <MemberByIdButton id={field.value} size="sm" />
                ) : (
                  <></>
                )
              }
            />
          </FormControl>
        </Flex>

        <FormControl>
          <Checkbox
            isChecked={!!dueDate}
            readOnly={!isMember}
            onChange={handleToggleDueDate}
          >
            {t('TaskContent.dueDate')}
          </Checkbox>
          {dueDate ? (
            <Box pl={6}>
              <Input
                {...register('dueDate')}
                type="datetime-local"
                size="sm"
                maxW="250px"
                readOnly={!isMember}
              />
            </Box>
          ) : null}
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

        {!id && isMember && (
          <Box w="100%" textAlign="right">
            <Button colorScheme="blue" onClick={onSubmit}>
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
