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
import MeetingContainer from '../components/MeetingContainer'

interface Props extends UseModalProps {
  id: string
}

export default function MeetingModal({ id, ...modalProps }: Props) {
  const path = usePathInOrg(`meetings/${id}`)
  const windowSize = useWindowSize()

  return (
    <Modal size="4xl" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent borderRadius="lg" overflow="hidden">
        <MeetingContainer
          id={id}
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
