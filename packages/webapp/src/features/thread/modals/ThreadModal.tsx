import ModalCloseStaticButton from '@/common/atoms/ModalCloseStaticButton'
import ModalMaximizeButton from '@/common/atoms/ModalMaximizeButton'
import useWindowSize from '@/common/hooks/useWindowSize'
import { usePathInOrg } from '@/org/hooks/usePathInOrg'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import React from 'react'
import ThreadContent from '../components/ThreadContent'

interface Props extends UseModalProps {
  id: string
}

export default function ThreadModal({ id, ...modalProps }: Props) {
  const path = usePathInOrg(`threads/${id}`)
  const windowSize = useWindowSize()

  return (
    <Modal
      size="3xl"
      isCentered
      blockScrollOnMount={false}
      autoFocus={false}
      {...modalProps}
    >
      <ModalOverlay />
      <ModalContent borderRadius="lg" overflow="hidden">
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
