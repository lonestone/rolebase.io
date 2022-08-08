import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalCloseStaticButton from '@components/atoms/ModalCloseStaticButton'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { usePathInOrg } from '@hooks/usePathInOrg'
import React from 'react'
import MeetingContent from '../meeting/MeetingContent'

interface Props extends UseModalProps {
  id: string
}

export default function MeetingModal({ id, ...modalProps }: Props) {
  const path = usePathInOrg(`meetings/${id}`)

  return (
    <Modal
      size="3xl"
      autoFocus={false}
      trapFocus={
        /* Prevent a bug with the editor toolbar scrolling to top on click */
        false
      }
      {...modalProps}
    >
      <ModalOverlay />
      <ModalContent>
        <MeetingContent
          id={id}
          onClose={modalProps.onClose}
          headerIcons={
            <>
              <ModalMaximizeButton to={path} />
              <ModalCloseStaticButton />
            </>
          }
          px={6}
          py={4}
        />
      </ModalContent>
    </Modal>
  )
}
