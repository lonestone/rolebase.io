import {
  Flex,
  Heading,
  Spacer,
  useColorMode,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import HeaderButton from '@components/atoms/HeaderButton'
import OrgMenu from '@components/molecules/OrgMenu'
import HeaderSearchCombobox from '@components/molecules/search/HeaderSearchCombobox'
import UserMenu from '@components/molecules/UserMenu'
import useCurrentOrg from '@hooks/useCurrentOrg'
import { useStoreState } from '@store/hooks'
import React from 'react'
import {
  FiCalendar,
  FiCheckSquare,
  FiDisc,
  FiMessageSquare,
} from 'react-icons/fi'
import useCurrentMember from '@hooks/useCurrentMember'
import MeetingModal from './modals/MeetingModal'

export default function Header() {
  const user = useStoreState((state) => state.auth.user)
  const org = useCurrentOrg()
  const member = useCurrentMember()

  const {
    isOpen: isMeetingOpen,
    onOpen: openMeetingModal,
    onClose: closeMeetingModal,
  } = useDisclosure()

  const { colorMode } = useColorMode()

  if (!user) return null
  return (
    <>
      <Flex
        w="100%"
        h="48px"
        alignItems="center"
        px={1}
        bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
        borderBottom="1px solid"
        borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.550'}
        zIndex={1000}
      >
        {org && (
          <>
            <OrgMenu />

            <Heading size="sm" ml={5} mr={5}>
              {org.name}
            </Heading>

            <HeaderButton exact to={`/orgs/${org.id}`} leftIcon={<FiDisc />}>
              Cercles
            </HeaderButton>

            <HeaderButton
              to={`/orgs/${org.id}/threads`}
              leftIcon={<FiMessageSquare />}
            >
              Discussions
            </HeaderButton>

            <HeaderButton
              to={`/orgs/${org.id}/meetings`}
              leftIcon={<FiCalendar />}
            >
              Réunions
            </HeaderButton>

            <HeaderButton
              to={`/orgs/${org.id}/tasks`}
              leftIcon={<FiCheckSquare />}
            >
              Tâches
            </HeaderButton>
          </>
        )}
        <Spacer />
        {member?.meetingId && (
          <Button size="sm" colorScheme="blue" onClick={openMeetingModal}>
            Réunion en cours
          </Button>
        )}
        {org && <HeaderSearchCombobox />}
        <UserMenu ml={2} />
      </Flex>
      {isMeetingOpen && member?.meetingId ? (
        <MeetingModal
          id={member.meetingId}
          isOpen
          onClose={closeMeetingModal}
        />
      ) : null}
    </>
  )
}
