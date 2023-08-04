import {
  Container,
  Flex,
  Icon,
  Link,
  Spacer,
  useMediaQuery,
} from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import React, { useContext } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import MeetingPanelStarted from './MeetingPanelStarted'

export default function MeetingPanel() {
  const [isSmallScreen] = useMediaQuery('(max-width: 750px)')

  const {
    meeting,
    currentStep,
    currentStepConfig,
    canEdit,
    isStarted,
    handleScrollToStep,
  } = useContext(MeetingContext)!

  const handleStepLinkClick = useNormalClickHandler(() => {
    if (!currentStep) return
    handleScrollToStep(currentStep?.id)
  })

  if (!meeting || !canEdit || !isStarted) {
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

      <Flex justifyContent="end">{isStarted && <MeetingPanelStarted />}</Flex>
    </Container>
  )
}
