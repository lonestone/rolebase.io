import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Spacer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import CircleButton from '@components/atoms/CircleButton'
import { CirclePanelTab } from '@components/atoms/CirclePanelTab'
import Markdown from '@components/atoms/Markdown'
import ModalCloseStaticButton from '@components/atoms/ModalCloseStaticButton'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import { Title } from '@components/atoms/Title'
import ActionsMenu from '@components/molecules/ActionsMenu'
import CircleAndParents from '@components/molecules/CircleAndParentsLinks'
import CircleMemberFormControl from '@components/molecules/CircleMemberFormControl'
import MeetingsInCircleList from '@components/molecules/MeetingsInCircleList'
import SubCirclesFormControl from '@components/molecules/SubCirclesFormControl'
import TasksInCircleList from '@components/molecules/TasksInCircleList'
import ThreadsInCircleList from '@components/molecules/ThreadsInCircleList'
import useCircle from '@hooks/useCircle'
import useParticipants from '@hooks/useParticipants'
import { MembersScope } from '@shared/model/member'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  FiCalendar,
  FiCheckSquare,
  FiChevronDown,
  FiChevronUp,
  FiDisc,
  FiMessageSquare,
} from 'react-icons/fi'
import CircleDeleteModal from './modals/CircleDeleteModal'
import RoleEditModal from './modals/RoleEditModal'

interface Props {
  id: string
  changeTitle?: boolean
  headerIcons?: React.ReactNode
}

enum TabTypes {
  Circle,
  Threads,
  Meetings,
  Tasks,
}

export default function CircleContent({ id, changeTitle, headerIcons }: Props) {
  const { t } = useTranslation()
  const circle = useCircle(id)
  const role = circle?.role
  const { colorMode } = useColorMode()

  // Parent circles and linked circle
  const parentCircle = useCircle(circle?.parentId || undefined)
  const linkedCircle = useCircle(
    (role?.link === true ? parentCircle?.parentId : role?.link) || undefined
  )

  // Participants
  const participants = useParticipants(
    id,
    MembersScope.CircleLeaders,
    circle?.members.map((member) => member.id)
  )

  // Tabs
  const [tab, setTab] = React.useState<TabTypes>(0)

  // Role info toggle
  const { isOpen: isRoleInfoOpen, onToggle: onRoleInfoToggle } = useDisclosure()

  // Role edit modal
  const {
    isOpen: isEditRoleOpen,
    onOpen: onEditRoleOpen,
    onClose: onEditRoleClose,
  } = useDisclosure()

  // Delete modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

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

      <ModalHeader pt={2} pb={1} pr={3}>
        <Flex>
          <CircleAndParents id={id} />
          <Spacer />

          <Box>
            <ParticipantsNumber participants={participants} />
          </Box>

          <ActionsMenu onEdit={onEditRoleOpen} onDelete={onDeleteOpen} />

          {headerIcons}
          <ModalCloseStaticButton />
        </Flex>
      </ModalHeader>

      <ModalBody pt={0} pb={5}>
        <Tabs isLazy variant="unstyled" index={tab} onChange={setTab}>
          <TabList
            mx="-1.5rem"
            px="1.5rem"
            borderTop="1px solid"
            borderBottom="1px solid"
            borderTopColor={colorMode === 'light' ? 'gray.200' : 'gray.550'}
            borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.550'}
            overflow="auto"
          >
            <CirclePanelTab icon={<FiDisc />}>
              {t(
                role.singleMember
                  ? 'organisms.CircleContent.tabRole'
                  : 'organisms.CircleContent.tabCircle'
              )}
            </CirclePanelTab>
            <CirclePanelTab icon={<FiMessageSquare />}>
              {t('organisms.CircleContent.tabThreads')}
            </CirclePanelTab>
            <CirclePanelTab icon={<FiCalendar />}>
              {t('organisms.CircleContent.tabMeetings')}
            </CirclePanelTab>
            <CirclePanelTab icon={<FiCheckSquare />}>
              {t('organisms.CircleContent.tabTasks')}
            </CirclePanelTab>
          </TabList>

          <TabPanels mt={5}>
            <TabPanel p={0}>
              <VStack spacing={5} align="stretch">
                {role.purpose && (
                  <FormControl>
                    <FormLabel>
                      {t('organisms.CircleContent.purpose')}
                    </FormLabel>
                    <Markdown>{role.purpose}</Markdown>
                  </FormControl>
                )}

                {(role.domain ||
                  role.accountabilities ||
                  role.checklist ||
                  role.indicators ||
                  role.notes) && (
                  <>
                    <Button
                      variant="link"
                      rightIcon={
                        isRoleInfoOpen ? <FiChevronUp /> : <FiChevronDown />
                      }
                      onClick={onRoleInfoToggle}
                    >
                      {t(isRoleInfoOpen ? 'common.seeLess' : 'common.seeMore')}
                    </Button>
                    <Collapse in={isRoleInfoOpen} animateOpacity>
                      <VStack spacing={5} align="stretch">
                        {role.domain && (
                          <FormControl>
                            <FormLabel>
                              {t('organisms.CircleContent.domain')}
                            </FormLabel>
                            <Markdown>{role.domain}</Markdown>
                          </FormControl>
                        )}

                        {role.accountabilities && (
                          <FormControl>
                            <FormLabel>
                              {t('organisms.CircleContent.accountabilities')}
                            </FormLabel>
                            <Markdown>{role.accountabilities}</Markdown>
                          </FormControl>
                        )}

                        {role.checklist && (
                          <FormControl>
                            <FormLabel>
                              {t('organisms.CircleContent.checklist')}
                            </FormLabel>
                            <Markdown>{role.checklist}</Markdown>
                          </FormControl>
                        )}

                        {role.indicators && (
                          <FormControl>
                            <FormLabel>
                              {t('organisms.CircleContent.indicators')}
                            </FormLabel>
                            <Markdown>{role.indicators}</Markdown>
                          </FormControl>
                        )}

                        {role.notes && (
                          <FormControl>
                            <FormLabel>
                              {t('organisms.CircleContent.notes')}
                            </FormLabel>
                            <Markdown>{role.notes}</Markdown>
                          </FormControl>
                        )}
                      </VStack>
                    </Collapse>
                  </>
                )}

                {!role.singleMember ? (
                  <SubCirclesFormControl
                    circle={circle}
                    participants={participants}
                  />
                ) : null}

                <CircleMemberFormControl circleId={id} />

                {parentCircle && linkedCircle && (
                  <Text>
                    <Trans
                      i18nKey="organisms.CircleContent.representCircle"
                      components={{
                        link: <CircleButton circle={parentCircle} />,
                      }}
                    />
                    <br />
                    <Trans
                      i18nKey="organisms.CircleContent.representInCircle"
                      components={{
                        link: <CircleButton circle={linkedCircle} />,
                      }}
                    />
                  </Text>
                )}
              </VStack>
            </TabPanel>

            <TabPanel p={0}>
              <ThreadsInCircleList circleId={id} />
            </TabPanel>

            <TabPanel p={0}>
              <MeetingsInCircleList circleId={id} />
            </TabPanel>

            <TabPanel p={0}>
              <TasksInCircleList circleId={id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalBody>

      {isEditRoleOpen && circle && (
        <RoleEditModal id={circle.roleId} isOpen onClose={onEditRoleClose} />
      )}

      {isDeleteOpen && (
        <CircleDeleteModal id={id} isOpen onClose={onDeleteClose} />
      )}
    </>
  )
}
