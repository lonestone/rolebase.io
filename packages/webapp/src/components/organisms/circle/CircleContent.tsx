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
import { Member_Scope_Enum } from '@gql'
import useCircle from '@hooks/useCircle'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import useOrgMember from '@hooks/useOrgMember'
import useParticipants from '@hooks/useParticipants'
import ActionsMenu from '@molecules/ActionsMenu'
import ParticipantsNumber from '@molecules/ParticipantsNumber'
import CircleAndParentsLinks from '@molecules/circle/CircleAndParentsLinks'
import CircleDecisions from '@molecules/circle/CircleDecisions'
import CircleMeetings from '@molecules/circle/CircleMeetings'
import CircleNews from '@molecules/circle/CircleNews'
import CircleRoleFormControl from '@molecules/circle/CircleRoleFormControl'
import CircleTasks from '@molecules/circle/CircleTasks'
import CircleThreads from '@molecules/circle/CircleThreads'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  CircleIcon,
  DecisionsIcon,
  MeetingsIcon,
  NewsIcon,
  TasksIcon,
  ThreadsIcon,
} from 'src/icons'
import RoleEditModal from '../role/RoleEditModal'
import CircleCopyModal from './CircleCopyModal'
import CircleDeleteModal from './CircleDeleteModal'
import CircleMoveModal from './CircleMoveModal'

interface Props {
  id: string
  changeTitle?: boolean
  headerIcons?: React.ReactNode
}

export default function CircleContent({ id, changeTitle, headerIcons }: Props) {
  const { t } = useTranslation()
  const isMember = useOrgMember()
  const circle = useCircle(id)
  const navigateOrg = useNavigateOrg()
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

      <Tabs isLazy display="flex" flexDirection="column" h="100%">
        <Flex p={2} pl={6} bg="menulight" _dark={{ bg: 'menudark' }}>
          <CircleAndParentsLinks circle={circle} size="md" />
          <Spacer />

          <Box>
            <ParticipantsNumber participants={participants} mr={1} />
          </Box>

          {isMember && (
            <ActionsMenu
              className="userflow-circle-actions"
              onEdit={editRoleModal.onOpen}
              onDelete={circle.parentId ? deleteModal.onOpen : undefined}
              onMove={circle.parentId ? moveModal.onOpen : undefined}
              onDuplicate={circle.parentId ? duplicateModal.onOpen : undefined}
              onExport={() => navigateOrg(`export-circle/${id}`)}
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
            <CircleRoleFormControl
              circle={circle}
              participants={participants}
            />
          </TabPanel>
          <TabPanel px={6} py={10}>
            <CircleNews circleId={id} />
          </TabPanel>
          <TabPanel px={6} py={10}>
            <CircleThreads circleId={id} />
          </TabPanel>
          <TabPanel px={6} py={10}>
            <CircleMeetings circleId={id} />
          </TabPanel>
          <TabPanel px={6} py={10}>
            <CircleTasks circleId={id} />
          </TabPanel>
          <TabPanel px={6} py={10}>
            <CircleDecisions circleId={id} />
          </TabPanel>
        </TabPanels>
      </Tabs>

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
