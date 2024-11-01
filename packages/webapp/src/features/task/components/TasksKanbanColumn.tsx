import useOrgMember from '@/member/hooks/useOrgMember'
import { AddIcon } from '@chakra-ui/icons'
import { Button, IconButton } from '@chakra-ui/react'
import { TaskFragment, Task_Status_Enum } from '@gql'
import { Draggable } from '@hello-pangea/dnd'
import { TasksViewTypes } from '@rolebase/shared/model/task'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { taskStatusColors } from 'src/theme'
import { TasksModuleContext } from '../contexts/TasksModuleContext'
import { KanbanColumn } from './KanbanColumn'
import TaskCard from './TaskCard'

interface Props {
  status: Task_Status_Enum
  tasks: TaskFragment[]
  showCircle?: boolean
  showMember?: boolean
  onOrderChange?(tasksIds: string[], changedTask: TaskFragment): void
}

export default function TasksKanbanColumn({
  status,
  tasks,
  showCircle,
  showMember,
}: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const colorScheme = taskStatusColors[status]

  const { openCreateTask, onViewChange, onStatusChange } =
    useContext(TasksModuleContext)

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  )

  const handleDoneTasksClick = useMemo(
    () =>
      onViewChange && onStatusChange
        ? () => {
            onViewChange(TasksViewTypes.List)
            onStatusChange(Task_Status_Enum.Done)
          }
        : undefined,
    [onViewChange, onStatusChange]
  )

  return (
    <KanbanColumn
      key={status}
      id={status}
      title={t(`common.taskStatus.${status}`)}
      colorScheme={colorScheme}
      count={filteredTasks.length}
      extra={
        status === Task_Status_Enum.Done ? (
          handleDoneTasksClick ? (
            <Button
              colorScheme={colorScheme}
              variant="outline"
              size="sm"
              w="100%"
              onClick={handleDoneTasksClick}
            >
              {t('TasksKanban.showDoneTasks')}
            </Button>
          ) : null
        ) : isMember && openCreateTask ? (
          <IconButton
            icon={<AddIcon w="10px" h="10px" />}
            variant="outline"
            size="sm"
            w="100%"
            aria-label={t('TasksKanban.createTask')}
            onClick={() => openCreateTask({ status })}
          />
        ) : null
      }
    >
      {filteredTasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided, snapshot) => (
            <TaskCard
              ref={provided.innerRef}
              task={task}
              showCircle={showCircle}
              showMember={showMember}
              isDragging={snapshot.isDragging}
              mb={2}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            />
          )}
        </Draggable>
      ))}
    </KanbanColumn>
  )
}
