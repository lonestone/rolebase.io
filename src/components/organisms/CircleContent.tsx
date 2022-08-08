import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  ModalCloseButton,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import ModalCloseStaticButton from '@components/atoms/ModalCloseStaticButton'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import { Title } from '@components/atoms/Title'
import AccordionIconButton from '@components/molecules/AccordionIconButton'
import ActionsMenu from '@components/molecules/ActionsMenu'
import CircleAndParentsLinks from '@components/molecules/CircleAndParentsLinks'
import CircleDecisions from '@components/molecules/CircleDecisions'
import CircleMeetings from '@components/molecules/CircleMeetings'
import CircleRoleFormControl from '@components/molecules/CircleRoleFormControl'
import CircleTasks from '@components/molecules/CircleTasks'
import CircleThreads from '@components/molecules/CircleThreads'
import useCircle from '@hooks/useCircle'
import useParticipants from '@hooks/useParticipants'
import { MembersScope } from '@shared/model/member'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiArrowRightCircle,
  FiCalendar,
  FiCheckSquare,
  FiDisc,
  FiMessageSquare,
} from 'react-icons/fi'
import CircleCopyModal from './modals/CircleCopyModal'
import CircleDeleteModal from './modals/CircleDeleteModal'
import CircleMoveModal from './modals/CircleMoveModal'
import RoleEditModal from './modals/RoleEditModal'

interface Props {
  id: string
  changeTitle?: boolean
  headerIcons?: React.ReactNode
}

export default function CircleContent({ id, changeTitle, headerIcons }: Props) {
  const { t } = useTranslation()
  const circle = useCircle(id)
  const role = circle?.role

  // Participants
  const participants = useParticipants(
    id,
    MembersScope.CircleLeaders,
    circle?.members.map((member) => member.id)
  )

  // Modals
  const editRoleModal = useDisclosure()
  const deleteModal = useDisclosure()
  const duplicateModal = useDisclosure()
  const moveModal = useDisclosure()

  if (!role) {
    return (
      <>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{t('organisms.CircleContent.notFound')}</AlertTitle>
        </Alert>
        <ModalCloseButton />
      </>
    )
  }

  return (
    <>
      {changeTitle && <Title>{role.name}</Title>}

      <Flex pt={2} pl={6} pr={2} pb={5}>
        <CircleAndParentsLinks id={id} />
        <Spacer />

        <Box>
          <ParticipantsNumber participants={participants} />
        </Box>

        <ActionsMenu
          onEdit={editRoleModal.onOpen}
          onDelete={circle.parentId ? deleteModal.onOpen : undefined}
          onMove={circle.parentId ? moveModal.onOpen : undefined}
          onDuplicate={circle.parentId ? duplicateModal.onOpen : undefined}
        />

        {headerIcons}
        <ModalCloseStaticButton />
      </Flex>

      <Box pb={5}>
        <Accordion allowToggle defaultIndex={[0]}>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionIconButton icon={<FiDisc />}>
                  {t('organisms.CircleContent.tabRole')}
                </AccordionIconButton>
                <AccordionPanel px={6} py={5}>
                  {isExpanded && (
                    <CircleRoleFormControl
                      circle={circle}
                      participants={participants}
                    />
                  )}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionIconButton icon={<FiMessageSquare />}>
                  {t('organisms.CircleContent.tabThreads')}
                </AccordionIconButton>
                <AccordionPanel px={6} py={5}>
                  {isExpanded && <CircleThreads circleId={id} />}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionIconButton icon={<FiCalendar />}>
                  {t('organisms.CircleContent.tabMeetings')}
                </AccordionIconButton>
                <AccordionPanel px={6} py={5}>
                  {isExpanded && <CircleMeetings circleId={id} />}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionIconButton icon={<FiCheckSquare />}>
                  {t('organisms.CircleContent.tabTasks')}
                </AccordionIconButton>
                <AccordionPanel px={6} py={5}>
                  {isExpanded && <CircleTasks circleId={id} />}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionIconButton icon={<FiArrowRightCircle />}>
                  {t('organisms.CircleContent.tabDecisions')}
                </AccordionIconButton>
                <AccordionPanel px={6} py={5}>
                  {isExpanded && <CircleDecisions circleId={id} />}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </Box>

      {editRoleModal.isOpen && circle && (
        <RoleEditModal
          id={circle.roleId}
          isOpen
          onClose={editRoleModal.onClose}
        />
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
