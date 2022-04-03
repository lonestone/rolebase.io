import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { useOrgId } from '@hooks/useOrgId'
import React from 'react'
import MeetingContent from '../MeetingContent'
import ModalCloseStaticButton from './ModalCloseStaticButton'

interface Props extends UseModalProps {
  id: string
}

export default function MeetingModal({ id, ...modalProps }: Props) {
  const orgId = useOrgId()

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
              <ModalMaximizeButton to={`/orgs/${orgId}/meetings/${id}`} />
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
