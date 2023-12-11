import ModalCloseStaticButton from '@atoms/ModalCloseStaticButton'
import Tab from '@atoms/Tab'
import { Title } from '@atoms/Title'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  ModalCloseButton,
  Spacer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'
import { CircleContext } from '@contexts/CIrcleContext'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import useOrgMember from '@hooks/useOrgMember'
import ActionsMenu from '@molecules/ActionsMenu'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import CircleAndParentsLinks from '@molecules/circle/CircleAndParentsLinks'
import CircleDecisions from '@molecules/circle/CircleDecisions'
import CircleMeetings from '@molecules/circle/CircleMeetings'
import CircleNews from '@molecules/circle/CircleNews'
import CircleRole from '@molecules/circle/CircleRole'
import CircleTasks from '@molecules/circle/CircleTasks'
import CircleThreads from '@molecules/circle/CircleThreads'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CircleIcon,
  DecisionsIcon,
  MeetingsIcon,
  NewsIcon,
  TasksIcon,
  ThreadsIcon,
} from 'src/icons'
import CircleCopyModal from '../../organisms/circle/CircleCopyModal'
import CircleDeleteModal from '../../organisms/circle/CircleDeleteModal'
import CircleMoveModal from '../../organisms/circle/CircleMoveModal'
import RoleEditModal from '../../organisms/role/RoleEditModal'
import CirclePrivacy from './CirclePrivacy'

interface Props {
  changeTitle?: boolean
  headerIcons?: React.ReactNode
}

export default function CircleContent({ changeTitle, headerIcons }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const circleContext = useContext(CircleContext)
  const navigateOrg = useNavigateOrg()

  // Modals
  const editRoleModal = useDisclosure()
  const deleteModal = useDisclosure()
  const duplicateModal = useDisclosure()
  const moveModal = useDisclosure()

  if (!circleContext) {
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

  const { circle, role, participants, canEditCircle, canEditRole } =
    circleContext

  return (
    <>
      {changeTitle && <Title>{role.name}</Title>}

      <Tabs isLazy display="flex" flexDirection="column" h="100%">
        <Flex p={2} pl={6} bg="menulight" _dark={{ bg: 'menudark' }}>
          <CircleAndParentsLinks circle={circle} size="md" />
          <Spacer />

          <Box mr={1}>
            <ParticipantsNumber participants={participants} />
          </Box>

          <Box>
            <CirclePrivacy />
          </Box>

          {isMember && (
            <ActionsMenu
              className="userflow-circle-actions"
              onEdit={canEditRole ? editRoleModal.onOpen : undefined}
              onDelete={
                canEditCircle && circle.parentId
                  ? deleteModal.onOpen
                  : undefined
              }
              onMove={
                canEditCircle && circle.parentId ? moveModal.onOpen : undefined
              }
              onDuplicate={
                canEditCircle && circle.parentId
                  ? duplicateModal.onOpen
                  : undefined
              }
              onExport={() => navigateOrg(`export-circle/${circle.id}`)}
            />
          )}

          {headerIcons}
          <ModalCloseStaticButton />
        </Flex>

        <TabList
          borderBottomWidth={0}
          pb={2}
          pl={6}
          bg="menulight"
          _dark={{ bg: 'menudark' }}
        >
          <Tab icon={CircleIcon} minimize>
            {t('CircleContent.tabRole')}
          </Tab>
          <Tab icon={NewsIcon} minimize>
            {t('CircleContent.tabNews')}
          </Tab>
          <Tab icon={ThreadsIcon} minimize>
            {t('CircleContent.tabThreads')}
          </Tab>
          <Tab icon={MeetingsIcon} minimize>
            {t('CircleContent.tabMeetings')}
          </Tab>
          <Tab icon={TasksIcon} minimize>
            {t('CircleContent.tabTasks')}
          </Tab>
          <Tab icon={DecisionsIcon} minimize>
            {t('CircleContent.tabDecisions')}
          </Tab>
        </TabList>

        <TabPanels flex={1} overflowY="auto">
          <TabPanel px={6} py={10}>
            <CircleRole />
          </TabPanel>
          <TabPanel px={6} py={10}>
            <CircleNews circleId={circle.id} />
          </TabPanel>
          <TabPanel px={6} py={10}>
            <CircleThreads circleId={circle.id} />
          </TabPanel>
          <TabPanel px={6} py={10}>
            <CircleMeetings circleId={circle.id} />
          </TabPanel>
          <TabPanel px={6} py={10}>
            <CircleTasks circleId={circle.id} />
          </TabPanel>
          <TabPanel px={6} py={10}>
            <CircleDecisions circleId={circle.id} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {editRoleModal.isOpen && role && (
        <RoleEditModal role={role} isOpen onClose={editRoleModal.onClose} />
      )}

      {deleteModal.isOpen && (
        <CircleDeleteModal
          id={circle.id}
          isOpen
          onClose={deleteModal.onClose}
        />
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
