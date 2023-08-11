import Loading from '@atoms/Loading'
import TextErrors from '@atoms/TextErrors'
import { Box, Button, HStack } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { Droppable } from '@hello-pangea/dnd'
import { MeetingThreadsContext } from '@molecules/MeetingThreadsDragDropContext'
import { MeetingStepThreadsFragment } from '@shared/model/meeting_step'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FaRandom } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
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
    threads,
    threadsByStep,
    stepThreadsIds,
    loading,
    error,
    add,
    remove,
    randomize,
  } = useContext(MeetingThreadsContext)!

  const selectedThreads = threadsByStep[step.id]
  const isEmpty = !selectedThreads || selectedThreads.length === 0

  if (!circle) return null

  return (
    <Box mb={5}>
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
        <HStack mt={5}>
          <ThreadSearchButton
            threads={threads}
            createCircleId={circle.id}
            excludeIds={stepThreadsIds}
            size="sm"
            leftIcon={<FiPlus />}
            onSelect={(id) => add(step.id, id)}
          >
            {t('MeetingStepContentThreads.add')}
          </ThreadSearchButton>

          {selectedThreads && selectedThreads.length > 2 && (
            <Button
              size="sm"
              leftIcon={<FaRandom />}
              onClick={() => randomize(step.id)}
            >
              {t('MeetingStepContentThreads.randomize')}
            </Button>
          )}

          {loading && <Loading active size="sm" />}
        </HStack>
      )}
    </Box>
  )
}
