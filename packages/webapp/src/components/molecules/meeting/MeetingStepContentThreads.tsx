import IconTextButton from '@atoms/IconTextButton'
import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Box, Button, HStack, Tag, useDisclosure } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { Droppable } from '@hello-pangea/dnd'
import { MeetingThreadsContext } from '@molecules/MeetingThreadsDragDropContext'
import ThreadEditModal from '@organisms/thread/ThreadEditModal'
import { MeetingStepThreadsFragment } from '@shared/model/meeting_step'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateIcon, RandomIcon } from 'src/icons'
import ThreadSearchButton from '../search/entities/threads/ThreadSearchButton'
import MeetingStepContentThreadItem from './MeetingStepContentThreadItem'

interface Props {
  step: MeetingStepThreadsFragment
}

// Props of drop zone when empty
const dropzoneProps = {
  position: 'absolute',
  h: '100px',
  top: '-40px',
  right: 0,
  left: 0,
  zIndex: -1,
} as const

export default function MeetingStepContentThreads({ step }: Props) {
  const { t } = useTranslation()
  const { circle, editable } = useContext(MeetingContext)!
  const {
    threadsByStep,
    availableThreads,
    loading,
    error,
    add,
    remove,
    randomize,
  } = useContext(MeetingThreadsContext)!

  const selectedThreads = threadsByStep[step.id]
  const isEmpty = !selectedThreads || selectedThreads.length === 0

  const createModal = useDisclosure()

  if (!circle) return null

  return (
    <Box mt={5} mb={5}>
      <TextErrors errors={[error]} />

      <Box position="relative">
        <Droppable droppableId={step.id} type="meeting-threads">
          {(provided, snapshot) => {
            const fixZone = isEmpty && !snapshot.isDraggingOver
            return (
              <Box
                ref={provided.innerRef}
                {...(fixZone ? dropzoneProps : {})}
                {...provided.droppableProps}
              >
                {selectedThreads?.map((item, i) => (
                  <MeetingStepContentThreadItem
                    key={item.id}
                    thread={item}
                    index={i}
                    onRemove={
                      editable ? () => remove(step.id, item.id) : undefined
                    }
                  />
                ))}
                {provided.placeholder}
              </Box>
            )
          }}
        </Droppable>
      </Box>

      {editable && (
        <HStack justifyContent="end">
          {loading && <Loading active size="sm" />}

          {selectedThreads && selectedThreads.length > 2 && (
            <IconTextButton
              size="sm"
              variant="outline"
              aria-label={t('MeetingStepContentThreads.randomize')}
              icon={<RandomIcon size={20} />}
              onClick={() => randomize(step.id)}
            />
          )}

          <ThreadSearchButton
            threads={availableThreads}
            createCircleId={circle.id}
            size="sm"
            variant="outline"
            rightIcon={
              <Tag
                colorScheme={availableThreads.length === 0 ? 'gray' : 'red'}
                size="sm"
              >
                {availableThreads.length}
              </Tag>
            }
            onSelect={(id) => add(step.id, id)}
          >
            {t('MeetingStepContentThreads.add')}
          </ThreadSearchButton>

          <Button
            size="sm"
            colorScheme="blue"
            leftIcon={<CreateIcon size={20} />}
            onClick={createModal.onOpen}
          >
            {t('MeetingStepContentThreads.create')}
          </Button>

          {createModal.isOpen && (
            <ThreadEditModal
              isOpen
              defaultCircleId={circle.id}
              onCreate={(id) => add(step.id, id)}
              onClose={createModal.onClose}
            />
          )}
        </HStack>
      )}
    </Box>
  )
}
