import {
  Center,
  Flex,
  forwardRef,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import CircleByIdButton from '@components/atoms/CircleByIdButton'
import MeetingModal from '@components/organisms/modals/MeetingModal'
import useDateLocale from '@hooks/useDateLocale'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import { MeetingEntry } from '@shared/model/meeting'
import { format } from 'date-fns'
import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'
import { capitalizeFirstLetter } from 'src/utils'

interface Props extends LinkBoxProps {
  meeting: MeetingEntry
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
    const date = meeting.startDate.toDate()

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

            {showDate &&
              capitalizeFirstLetter(
                format(date, 'PPPP ', {
                  locale: dateLocale,
                })
              )}

            {showTime &&
              format(date, 'p ', {
                locale: dateLocale,
              })}

            {(showDate || showTime) && <>&bull;&nbsp;</>}

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
