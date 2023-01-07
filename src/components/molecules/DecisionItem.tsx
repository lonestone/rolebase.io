import CircleByIdButton from '@atoms/CircleByIdButton'
import {
  Center,
  Flex,
  forwardRef,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import DecisionModal from '@organisms/decision/DecisionModal'
import { DecisionEntry } from '@shared/model/decision'
import React from 'react'
import { FiArrowRightCircle } from 'react-icons/fi'
import { Link as ReachLink } from 'react-router-dom'

interface Props extends LinkBoxProps {
  decision: DecisionEntry
  showCircle?: boolean
  showIcon?: boolean
}

const DecisionItem = forwardRef<Props, 'div'>(
  ({ decision, showCircle, showIcon, children, ...linkBoxProps }, ref) => {
    const path = usePathInOrg(`decisions/${decision.id}`)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleOpen = useNormalClickHandler(onOpen)
    const hover = useHoverItemStyle()

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
                <FiArrowRightCircle />
              </Center>
            )}

            <LinkOverlay as={ReachLink} flex={1} to={path} onClick={handleOpen}>
              {decision.title}
            </LinkOverlay>

            {showCircle && (
              <CircleByIdButton id={decision.circleId} size="xs" />
            )}

            {children}
          </Flex>
        </LinkBox>

        {isOpen && <DecisionModal id={decision.id} isOpen onClose={onClose} />}
      </>
    )
  }
)

DecisionItem.displayName = 'DecisionItem'

export default DecisionItem
