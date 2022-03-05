import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { useStoreState } from '@store/hooks'
import React from 'react'
import ThreadContent from '../ThreadContent'
import ModalCloseStaticButton from './ModalCloseStaticButton'

interface Props extends UseModalProps {
  id: string
}

export default function ThreadModal({ id, ...modalProps }: Props) {
  const orgId = useStoreState((state) => state.orgs.currentId)

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
