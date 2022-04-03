import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { useOrgId } from '@hooks/useOrgId'
import React from 'react'
import ThreadContent from '../ThreadContent'
import ModalCloseStaticButton from './ModalCloseStaticButton'

interface Props extends UseModalProps {
  id: string
}

export default function ThreadModal({ id, ...modalProps }: Props) {
  const orgId = useOrgId()

  return (
    <Modal size="3xl" isCentered autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent margin={0}>
        <ThreadContent
          id={id}
          headerIcons={
            id && (
              <>
                <ModalMaximizeButton to={`/orgs/${orgId}/threads/${id}`} />
                <ModalCloseStaticButton />
              </>
            )
          }
          h="95vh"
          pt={2}
        />
      </ModalContent>
    </Modal>
  )
}
