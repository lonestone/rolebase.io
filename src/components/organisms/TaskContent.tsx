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
  IconButton,
  Input,
  Spacer,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import Loading from '@components/atoms/Loading'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import MarkdownEditorController from '@components/molecules/editor/MarkdownEditorController'
import CircleSearchInput from '@components/molecules/search/entities/circles/CircleSearchInput'
import MemberSearchInput from '@components/molecules/search/entities/members/MemberSearchInput'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateLog from '@hooks/useCreateLog'
import useCurrentMember from '@hooks/useCurrentMember'
import useSubscription from '@hooks/useSubscription'
import useUpdateTaskStatus from '@hooks/useUpdateTaskStatus'
import { EntityChangeType, LogType } from '@shared/log'
import { useStoreState } from '@store/hooks'
import { Timestamp } from 'firebase/firestore'
import React, { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FiCheckSquare, FiSquare, FiTrash2 } from 'react-icons/fi'
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
  const createLog = useCreateLog()
  const orgId = useStoreState((state) => state.orgs.currentId)
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
      setValue('dueDate', null)
    } else {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      date.setHours(12, 0, 0, 0)
      setValue('dueDate', getDateTimeLocal(date))
    }
  }, [dueDate])

  // Toggle done status of a task
  const handleToggleDone = useCallback(() => {
    if (!task) return
    updateTaskStatus(task, task.doneDate ? null : Timestamp.now())
  }, [task])

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
          Tâche
        </Heading>

        {task && (
          <Button
            ml={5}
            size="sm"
            colorScheme="green"
            variant={task.doneDate ? 'solid' : 'outline'}
            leftIcon={task.doneDate ? <FiCheckSquare /> : <FiSquare />}
            onClick={handleToggleDone}
          >
            {task.doneDate ? 'Terminé' : 'Terminer'}
          </Button>
        )}

        <Spacer />

        <Box mr={headerIcons ? -3 : 0}>
          {id && (
            <IconButton
              aria-label=""
              icon={<FiTrash2 />}
              variant="ghost"
              size="sm"
              ml={3}
              onClick={onDeleteOpen}
            />
          )}

          {headerIcons}
        </Box>
      </Flex>

      {id && loading && <Loading active size="md" />}
      <TextErrors errors={[error]} />

      <form onSubmit={onSubmit}>
        <VStack spacing={5} align="stretch">
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Titre</FormLabel>
            <Input {...register('title')} placeholder="Titre..." autoFocus />
          </FormControl>

          <FormControl isInvalid={!!errors.circleId}>
            <FormLabel>Cercle / Rôle</FormLabel>
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
              Membre assigné
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
              Date limite
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
            <FormLabel>Description</FormLabel>
            <MarkdownEditorController
              name="description"
              placeholder="Notes, liens..."
              control={control}
            />
          </FormControl>

          <Collapse in={isDirty}>
            <Box textAlign="right">
              <Button colorScheme="blue" type="submit">
                {id ? 'Enregistrer' : 'Créer'}
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
