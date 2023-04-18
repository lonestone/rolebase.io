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
import ThreadContent from './ThreadContent'

interface Props extends UseModalProps {
  id: string
}

export default function ThreadModal({ id, ...modalProps }: Props) {
  const path = usePathInOrg(`threads/${id}`)
  const windowSize = useWindowSize()

  return (
    <Modal size="3xl" isCentered autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent
        margin={0}
        borderRadius="lg"
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ThreadContent
          id={id}
          headerIcons={
            id && (
              <>
                <ModalMaximizeButton to={path} />
                <ModalCloseStaticButton />
              </>
            )
          }
          h={`${windowSize.height * 0.9}px`}
        />
      </ModalContent>
    </Modal>
  )
}
