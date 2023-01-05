import {
  Center,
  Flex,
  forwardRef,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Tag,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import MeetingModal from '@components/organisms/meeting/MeetingModal'
import useDateLocale from '@hooks/useDateLocale'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import { MeetingEntry } from '@shared/model/meeting'
import { format } from 'date-fns'
import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'
import { capitalizeFirstLetter } from 'src/utils/capitalizeFirstLetter'

interface Props extends LinkBoxProps {
  meeting: MeetingEntry
  showCircle?: boolean
  showIcon?: boolean
  showDate?: boolean
  showDay?: boolean
  showTime?: boolean
}

const MeetingItem = forwardRef<Props, 'div'>(
  (
    {
      meeting,
      showCircle,
      showIcon,
      showDate,
      showDay,
      showTime,
      children,
      ...linkBoxProps
    },
    ref
  ) => {
    const { colorMode } = useColorMode()
    const path = usePathInOrg(`meetings/${meeting.id}`)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleOpen = useNormalClickHandler(onOpen)
    const hover = useHoverItemStyle()
    const dateLocale = useDateLocale()
    const date = new Date(meeting.startDate)

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
          <Flex align="start">
            {showIcon && (
              <Center w={6} h={6} mr={2}>
                <FiCalendar />
              </Center>
            )}

            {(showDate || showDay || showTime) && (
              <Tag
                colorScheme={
                  colorMode === 'light' ? 'blackAlpha' : 'whiteAlpha'
                }
                _dark={{
                  color: 'whiteAlpha.800',
                }}
                mr={2}
              >
                {showDate &&
                  capitalizeFirstLetter(
                    format(date, 'eeee P', {
                      locale: dateLocale,
                    })
                  )}
                {showDay &&
                  capitalizeFirstLetter(
                    format(date, 'eeee d', {
                      locale: dateLocale,
                    })
                  )}
                {(showDate || showDay) && showTime && <>,&nbsp;</>}
                {showTime &&
                  format(date, 'p', {
                    locale: dateLocale,
                  })}
              </Tag>
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
