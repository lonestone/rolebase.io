import { createTask, subscribeTask, updateTask } from '@api/entities/tasks'
import { nameSchema } from '@api/schemas'
import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import ActionsMenu from '@components/molecules/ActionsMenu'
import SimpleEditorController from '@components/molecules/editor/EditorController'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import MemberSearchInput from '@components/molecules/search/entities/members/MemberSearchInput'
import TaskStatusInput from '@components/molecules/TaskStatusInput'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import useCurrentMember from '@hooks/useCurrentMember'
import { useOrgId } from '@hooks/useOrgId'
import useSubscription from '@hooks/useSubscription'
import useUpdateTaskStatus from '@hooks/useUpdateTaskStatus'
import { EntityChangeType, LogType } from '@shared/model/log'
import { TaskStatus } from '@shared/model/task'
import { Timestamp } from 'firebase/firestore'
import React, { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getDateTimeLocal } from 'src/utils'
import * as yup from 'yup'
import TaskDeleteModal from './modals/TaskDeleteModal'

interface Props extends BoxProps {
  id?: string
  changeTitle?: boolean
  defaultCircleId?: string
  defaultMemberId?: string
  headerIcons?: React.ReactNode
  onClose(): void
}

interface Values {
  circleId: string
  memberId: string
  title: string
  description: string
  dueDate: string | null
}

const resolver = yupResolver(
  yup.object().shape({
    circleId: yup.string().required(),
    memberId: yup.string().required(),
    title: nameSchema,
    description: yup.string(),
  })
)

export default function TaskContent({
  id,
  changeTitle,
  defaultCircleId,
  defaultMemberId,
  headerIcons,
  onClose,
  ...boxProps
}: Props) {
  const { t } = useTranslation()
  const createLog = useCreateLog()
  const orgId = useOrgId()
  const currentMember = useCurrentMember()
  const updateTaskStatus = useUpdateTaskStatus()

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
      memberId: defaultMemberId || '',
      title: '',
      description: '',
      dueDate: null,
    },
  })

  // Reset form when task changes
  useEffect(() => {
    if (!task) return
    reset({
      circleId: task.circleId,
      memberId: task.memberId,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? getDateTimeLocal(task.dueDate.toDate()) : null,
    })
  }, [task])

  const dueDate = watch('dueDate')

  const onSubmit = handleSubmit(async ({ dueDate, ...data }) => {
    if (!orgId || !currentMember) return
    const taskUpdate = {
      ...data,
      dueDate: dueDate ? Timestamp.fromDate(new Date(dueDate)) : null,
    }
    if (id) {
      // Update task
      await updateTask(id, taskUpdate)
    } else {
      // Create task
      const newTask = await createTask({
        orgId,
        ...taskUpdate,
      })
      // Todo : refacto task status is in WIP
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

      onClose()
    }
  })

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
    [task]
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
          {t('organisms.TaskContent.heading')}
        </Heading>

        {task && (
          <TaskStatusInput
            value={task.status}
            onChange={handleChangeStatus}
            ml={5}
            size="lg"
          />
        )}

        <Spacer />

        <Flex mr={headerIcons ? -3 : 0}>
          {id && <ActionsMenu ml={3} onDelete={onDeleteOpen} />}

          {headerIcons}
        </Flex>
      </Flex>

      {id && loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <form onSubmit={onSubmit}>
        <VStack spacing={5} align="stretch">
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>{t('organisms.TaskContent.title')}</FormLabel>
            <Input
              {...register('title')}
              placeholder={t('organisms.TaskContent.titlePlaceholder')}
              autoFocus
            />
          </FormControl>

          <FormControl isInvalid={!!errors.circleId}>
            <FormLabel>{t('organisms.TaskContent.circle')}</FormLabel>
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

          <FormControl isInvalid={!!errors.memberId} flex="1">
            <FormLabel display="flex" alignItems="center">
              {t('organisms.TaskContent.memberId')}
            </FormLabel>
            <Controller
              name="memberId"
              control={control}
              render={({ field }) => (
                <MemberSearchInput
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <Checkbox isChecked={!!dueDate} onChange={handleToggleDueDate}>
              {t('organisms.TaskContent.dueDate')}
            </Checkbox>
            {dueDate ? (
              <Box pl={6}>
                <Input
                  {...register('dueDate')}
                  type="datetime-local"
                  size="sm"
                  maxW="250px"
                />
              </Box>
            ) : null}
          </FormControl>

          <FormControl isInvalid={!!errors.description}>
            <FormLabel>{t('organisms.TaskContent.description')}</FormLabel>
            <SimpleEditorController
              name="description"
              placeholder={t('organisms.TaskContent.notes')}
              control={control}
            />
          </FormControl>

          <Collapse in={isDirty}>
            <Box textAlign="right">
              <Button colorScheme="blue" type="submit">
                {t(id ? 'common.save' : 'common.create')}
              </Button>
            </Box>
          </Collapse>
        </VStack>
      </form>

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
