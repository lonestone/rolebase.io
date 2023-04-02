import {
  Container,
  Flex,
  Icon,
  Link,
  Spacer,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import MeetingStartNotificationModal from '@organisms/meeting/MeetingStartNotificationModal'
import React, { useContext } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import MeetingPanelEnded from './MeetingPanelEnded'
import MeetingPanelNotStarted from './MeetingPanelNotStarted'
import MeetingPanelStarted from './MeetingPanelStarted'

interface Props {
  forceEdit: boolean
  isModal: boolean
}

export default function MeetingPanel({ forceEdit, isModal }: Props) {
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
    <Container
      maxW="3xl"
      display="flex"
      justifyContent="space-between"
      flexDirection={isSmallScreen ? 'column' : 'row'}
    >
      {currentStepConfig ? (
        <Link
          href={`step-${currentStep?.id}`}
          display="flex"
          fontSize="lg"
          alignItems="center"
          onClick={handleStepLinkClick}
        >
          <Icon as={FiArrowRight} mr={2} />
          {currentStepConfig?.title}
        </Link>
      ) : (
        <Spacer />
      )}

      <Flex justifyContent="end">
        {isNotStarted && (
          <MeetingPanelNotStarted onStart={startNotifModal.onOpen} />
        )}

        {isEnded && forceEdit && <MeetingPanelEnded />}

        {isStarted && <MeetingPanelStarted />}
      </Flex>

      {startNotifModal.isOpen && (
        <MeetingStartNotificationModal
          isOpen
          onClose={startNotifModal.onClose}
        />
      )}
    </Container>
  )
}
