import ModalCloseStaticButton from '@atoms/ModalCloseStaticButton'
import { Title } from '@atoms/Title'
import {
  Accordion,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  ModalCloseButton,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import { Member_Scope_Enum } from '@gql'
import useCircle from '@hooks/useCircle'
import useOrgMember from '@hooks/useOrgMember'
import useParticipants from '@hooks/useParticipants'
import useWindowSize from '@hooks/useWindowSize'
import AccordionLazyItem from '@molecules/AccordionLazyItem'
import ActionsMenu from '@molecules/ActionsMenu'
import CircleAndParentsLinks from '@molecules/circle/CircleAndParentsLinks'
import CircleDecisions from '@molecules/circle/CircleDecisions'
import CircleMeetings from '@molecules/circle/CircleMeetings'
import CircleRoleFormControl from '@molecules/circle/CircleRoleFormControl'
import CircleTasks from '@molecules/circle/CircleTasks'
import CircleThreads from '@molecules/circle/CircleThreads'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiArrowRightCircle,
  FiCalendar,
  FiCheckSquare,
  FiDisc,
  FiMessageSquare,
} from 'react-icons/fi'
import RoleEditModal from '../role/RoleEditModal'
import CircleCopyModal from './CircleCopyModal'
import CircleDeleteModal from './CircleDeleteModal'
import CircleMoveModal from './CircleMoveModal'

interface Props {
  id: string
  changeTitle?: boolean
  extendBottom?: boolean
  isFirstTabOpen?: boolean
  headerIcons?: React.ReactNode
}

export default function CircleContent({
  id,
  changeTitle,
  extendBottom,
  isFirstTabOpen,
  headerIcons,
}: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const circle = useCircle(id)
  const role = circle?.role

  // Participants
  const participants = useParticipants(
    id,
    Member_Scope_Enum.CircleLeaders,
    circle?.members.map((member) => member.id)
  )

  // Modals
  const editRoleModal = useDisclosure()
  const deleteModal = useDisclosure()
  const duplicateModal = useDisclosure()
  const moveModal = useDisclosure()

  // Adapt accordion height to window height
  const accordionContainer = useRef<HTMLDivElement>(null)
  const accordionButtonsHeight = useRef<number>(0)
  const windowSize = useWindowSize()
  const [accordionHeight, setAccordionHeight] = useState<number | undefined>()

  useEffect(() => {
    const box = accordionContainer.current
    if (!box) return
    const { top, height } = box.getBoundingClientRect()
    if (accordionButtonsHeight.current === 0) {
      accordionButtonsHeight.current = height
    }
    setAccordionHeight(
      extendBottom
        ? windowSize.height - top - accordionButtonsHeight.current - 1
        : undefined
    )
  }, [windowSize, extendBottom])

  if (!role) {
    return (
      <>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{t('CircleContent.notFound')}</AlertTitle>
        </Alert>
        <ModalCloseButton />
      </>
    )
  }

  return (
    <>
      {changeTitle && <Title>{role.name}</Title>}

      <Flex p={2} pl={6}>
        <CircleAndParentsLinks circle={circle} size="md" />
        <Spacer />

        <Box>
          <ParticipantsNumber participants={participants} />
        </Box>

        {isMember && (
          <ActionsMenu
            className="userflow-circle-actions"
            onEdit={editRoleModal.onOpen}
            onDelete={circle.parentId ? deleteModal.onOpen : undefined}
            onMove={circle.parentId ? moveModal.onOpen : undefined}
            onDuplicate={circle.parentId ? duplicateModal.onOpen : undefined}
          />
        )}

        {headerIcons}
        <ModalCloseStaticButton />
      </Flex>

      <Box ref={accordionContainer}>
        <Accordion allowToggle defaultIndex={isFirstTabOpen ? [0] : []}>
          <AccordionLazyItem
            icon={<FiDisc />}
            label={t('CircleContent.tabRole')}
            h={accordionHeight}
          >
            <CircleRoleFormControl
              circle={circle}
              participants={participants}
            />
          </AccordionLazyItem>

          <AccordionLazyItem
            icon={<FiMessageSquare />}
            label={t('CircleContent.tabThreads')}
            h={accordionHeight}
          >
            <CircleThreads circleId={id} />
          </AccordionLazyItem>

          <AccordionLazyItem
            icon={<FiCalendar />}
            label={t('CircleContent.tabMeetings')}
            h={accordionHeight}
          >
            <CircleMeetings circleId={id} />
          </AccordionLazyItem>

          <AccordionLazyItem
            icon={<FiCheckSquare />}
            label={t('CircleContent.tabTasks')}
            h={accordionHeight}
          >
            <CircleTasks circleId={id} />
          </AccordionLazyItem>

          <AccordionLazyItem
            icon={<FiArrowRightCircle />}
            label={t('CircleContent.tabDecisions')}
            h={accordionHeight}
          >
            <CircleDecisions circleId={id} />
          </AccordionLazyItem>
        </Accordion>
      </Box>

      {editRoleModal.isOpen && role && (
        <RoleEditModal role={role} isOpen onClose={editRoleModal.onClose} />
      )}

      {deleteModal.isOpen && (
        <CircleDeleteModal id={id} isOpen onClose={deleteModal.onClose} />
      )}

      {moveModal.isOpen && (
        <CircleMoveModal isOpen onClose={moveModal.onClose} />
      )}

      {duplicateModal.isOpen && (
        <CircleCopyModal isOpen onClose={duplicateModal.onClose} />
      )}
    </>
  )
}
