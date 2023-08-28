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
import { DecisionFragment } from '@gql'
import { useHoverItemStyle } from '@hooks/useHoverItemStyle'
import { useNormalClickHandler } from '@hooks/useNormalClickHandler'
import { usePathInOrg } from '@hooks/usePathInOrg'
import DecisionModal from '@organisms/decision/DecisionModal'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { DecisionIcon } from 'src/icons'

interface Props extends LinkBoxProps {
  decision: DecisionFragment
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
              <Center mr={2}>
                <DecisionIcon />
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
