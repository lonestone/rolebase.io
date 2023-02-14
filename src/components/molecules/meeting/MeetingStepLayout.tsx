import { Box, Flex, Heading } from '@chakra-ui/react'
import { MeetingContext } from '@contexts/MeetingContext'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import React, { useContext } from 'react'
import MeetingStepNumber from './MeetingStepNumber'

interface Props {
  index: number
  stepId: string
  title: string
  current: boolean
  onStepClick?(): void
  children: React.ReactNode
}

export default function MeetingStepLayout({
  index,
  stepId,
  title,
  current,
  onStepClick,
  children,
}: Props) {
  const { handleScrollToStep } = useContext(MeetingContext)!
  const anchor = `step-${stepId}`

  const handleStepLinkClick = useNormalClickHandler(() =>
    handleScrollToStep(stepId)
  )

  return (
    <>
      <Flex alignItems="center">
        {/* Anchor */}
        <Box id={anchor} transform="translateY(-100px)" />

        <MeetingStepNumber
          index={index}
          current={current}
          mr={4}
          onStepClick={onStepClick}
        />
        <Heading as="h2" size="md">
          <a href={`#${anchor}`} onClick={handleStepLinkClick}>
            {title}
          </a>
        </Heading>
      </Flex>
      <Box pt={7} pb={20}>
        {children}
      </Box>
    </>
  )
}
