import CircleByIdButton from '@atoms/CircleByIdButton'
import {
  Center,
  Flex,
  forwardRef,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { MeetingSummaryFragment } from '@gql'
import useDateLocale from '@hooks/useDateLocale'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import MeetingModal from '@organisms/meeting/MeetingModal'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { format } from 'date-fns'
import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkBoxProps {
  meeting: MeetingSummaryFragment
  showCircle?: boolean
  showIcon?: boolean
  showDate?: boolean
  showTime?: boolean
}

const MeetingItem = forwardRef<Props, 'div'>(
  (
    {
      meeting,
      showCircle,
      showIcon,
      showDate,
      showTime,
      children,
      ...linkBoxProps
    },
    ref
  ) => {
    const path = usePathInOrg(`meetings/${meeting.id}`)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleOpen = useNormalClickHandler(onOpen)
    const hover = useHoverItemStyle()
    const dateLocale = useDateLocale()
    const startDate = new Date(meeting.startDate)
    const endDate = new Date(meeting.endDate)

    return (
      <>
        <LinkBox
          ref={ref}
          p={1}
          _hover={hover}
          {...linkBoxProps}
          tabIndex={
            // Remove tabIndex because it's redondant with link
            undefined
          }
        >
          <Flex align="center">
            {showIcon && (
              <Center w={6} h={6} mr={2}>
                <FiCalendar />
              </Center>
            )}

            {showDate && (
              <Text mr={3} color="gray.500" _dark={{ color: 'gray.300' }}>
                {capitalizeFirstLetter(
                  format(startDate, 'eeee P', { locale: dateLocale })
                )}
              </Text>
            )}

            {showTime && (
              <Text mr={3} color="gray.500" _dark={{ color: 'gray.300' }}>
                {format(startDate, 'p', { locale: dateLocale })}
                {' - '}
                {format(endDate, 'p', { locale: dateLocale })}
              </Text>
            )}

            <LinkOverlay as={ReachLink} flex={1} to={path} onClick={handleOpen}>
              {meeting.title}
            </LinkOverlay>

            {showCircle && <CircleByIdButton id={meeting.circleId} size="xs" />}

            {children}
          </Flex>
        </LinkBox>

        {isOpen && <MeetingModal id={meeting.id} isOpen onClose={onClose} />}
      </>
    )
  }
)

MeetingItem.displayName = 'MeetingItem'

export default MeetingItem
