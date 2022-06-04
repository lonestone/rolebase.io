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
  ModalCloseButton,
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
import Markdown from '@components/atoms/Markdown'
import ModalCloseStaticButton from '@components/atoms/ModalCloseStaticButton'
import ParticipantsNumber from '@components/atoms/ParticipantsNumber'
import { StyledTab } from '@components/atoms/StyledTab'
import { Title } from '@components/atoms/Title'
import ActionsMenu from '@components/molecules/ActionsMenu'
import CircleAndParents from '@components/molecules/CircleAndParentsLinks'
import CircleMeetings from '@components/molecules/CircleMeetings'
import CircleMemberFormControl from '@components/molecules/CircleMemberFormControl'
import CircleTasks from '@components/molecules/CircleTasks'
import CircleThreads from '@components/molecules/CircleThreads'
import SubCirclesFormControl from '@components/molecules/SubCirclesFormControl'
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

      <Flex pt={2} pl={6} pr={2}>
        <CircleAndParents id={id} />
        <Spacer />

        <Box>
          <ParticipantsNumber participants={participants} />
        </Box>

        <ActionsMenu
          onEdit={onEditRoleOpen}
          onDelete={circle.parentId ? onDeleteOpen : undefined}
        />

        {headerIcons}
        <ModalCloseStaticButton />
      </Flex>

      <Box px={6} pb={5}>
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
            <StyledTab icon={<FiDisc />}>
              {t(
                role.singleMember
                  ? 'organisms.CircleContent.tabRole'
                  : 'organisms.CircleContent.tabCircle'
              )}
            </StyledTab>
            <StyledTab icon={<FiMessageSquare />}>
              {t('organisms.CircleContent.tabThreads')}
            </StyledTab>
            <StyledTab icon={<FiCalendar />}>
              {t('organisms.CircleContent.tabMeetings')}
            </StyledTab>
            <StyledTab icon={<FiCheckSquare />}>
              {t('organisms.CircleContent.tabTasks')}
            </StyledTab>
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
              <CircleThreads circleId={id} />
            </TabPanel>

            <TabPanel p={0}>
              <CircleMeetings circleId={id} />
            </TabPanel>

            <TabPanel p={0}>
              <CircleTasks circleId={id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {isEditRoleOpen && circle && (
        <RoleEditModal id={circle.roleId} isOpen onClose={onEditRoleClose} />
      )}

      {isDeleteOpen && (
        <CircleDeleteModal id={id} isOpen onClose={onDeleteClose} />
      )}
    </>
  )
}
