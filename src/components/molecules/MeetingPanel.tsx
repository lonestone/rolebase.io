import {
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  useDisclosure,
  useMediaQuery,
  Wrap,
} from '@chakra-ui/react'
import GlassBox from '@components/atoms/GlassBox'
import MeetingStartNotificationModal from '@components/organisms/meeting/MeetingStartNotificationModal'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import React, { useContext } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { MeetingContext } from 'src/contexts/MeetingContext'
import { SidebarContext } from 'src/contexts/SidebarContext'
import MeetingDate from './MeetingDate'
import MeetingPanelEnded from './MeetingPanelEnded'
import MeetingPanelNotStarted from './MeetingPanelNotStarted'
import MeetingPanelStarted from './MeetingPanelStarted'
import MeetingTitle from './MeetingTitle'

interface Props {
  forceEdit: boolean
  isModal: boolean
}

export default function MeetingPanel({ forceEdit, isModal }: Props) {
  const sidebarContext = useContext(SidebarContext)
  const [isSmallScreen] = useMediaQuery('(max-width: 750px)')

  const {
    meeting,
    currentStep,
    currentStepConfig,
    canEdit,
    isEnded,
    isNotStarted,
    isStarted,
    handleScrollToStep,
  } = useContext(MeetingContext)!

  const handleStepLinkClick = useNormalClickHandler(() => {
    if (!currentStep) return
    handleScrollToStep(currentStep?.id)
  })

  // Start notification modal
  const startNotifModal = useDisclosure()

  if (!meeting || !canEdit || (isEnded && !forceEdit)) {
    return null
  }

  return (
    <GlassBox
      position="fixed"
      zIndex={10}
      bottom={0}
      left={isModal ? 0 : sidebarContext?.width}
      right={0}
      p={3}
      borderTopWidth="1px"
    >
      <Container
        maxW="3xl"
        display="flex"
        justifyContent="space-between"
        flexDirection={isSmallScreen ? 'column' : 'row'}
      >
        <Flex
          mb={isSmallScreen ? 2 : 0}
          flexDirection="column"
          justifyContent="space-around"
        >
          <Heading as="h1" size="sm">
            <MeetingTitle />
          </Heading>
          {currentStepConfig ? (
            <Link
              href={`step-${currentStep?.id}`}
              fontSize="sm"
              color="gray.500"
              display="flex"
              alignItems="center"
              onClick={handleStepLinkClick}
            >
              <Icon as={FiArrowRight} mr={2} />
              {currentStepConfig?.title}
            </Link>
          ) : (
            <Wrap spacing={5} align="center" fontSize="sm">
              <MeetingDate meeting={meeting} />
            </Wrap>
          )}
        </Flex>

        <Flex justifyContent="end">
          {isNotStarted && (
            <MeetingPanelNotStarted onStart={startNotifModal.onOpen} />
          )}

          {isEnded && forceEdit && <MeetingPanelEnded />}

          {isStarted && <MeetingPanelStarted />}
        </Flex>
      </Container>

      {startNotifModal.isOpen && (
        <MeetingStartNotificationModal
          isOpen
          onClose={startNotifModal.onClose}
        />
      )}
    </GlassBox>
  )
}
