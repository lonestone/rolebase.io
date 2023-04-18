import ModalCloseStaticButton from '@atoms/ModalCloseStaticButton'
import ModalMaximizeButton from '@atoms/ModalMaximizeButton'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import { usePathInOrg } from '@hooks/usePathInOrg'
import useWindowSize from '@hooks/useWindowSize'
import MeetingContent from '../meeting/MeetingContent'

interface Props extends UseModalProps {
  id: string
}

export default function MeetingModal({ id, ...modalProps }: Props) {
  const path = usePathInOrg(`meetings/${id}`)
  const windowSize = useWindowSize()

  return (
    <Modal size="4xl" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent
        borderRadius="lg"
        overflow="hidden"
        _dark={{
          bg: 'gray.800',
        }}
      >
        <MeetingContent
          id={id}
          onClose={modalProps.onClose}
          headerIcons={
            <>
              <ModalMaximizeButton to={path} />
              <ModalCloseStaticButton />
            </>
          }
          h={`${windowSize.height * 0.9}px`}
        />
      </ModalContent>
    </Modal>
  )
}
