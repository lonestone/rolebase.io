import {
  Modal,
  ModalContent,
  ModalOverlay,
  UseModalProps,
} from '@chakra-ui/react'
import ModalMaximizeButton from '@components/atoms/ModalMaximizeButton'
import { useOrgId } from '@hooks/useOrgId'
import useWindowSize from '@hooks/useWindowSize'
import React from 'react'
import ModalCloseStaticButton from '../../atoms/ModalCloseStaticButton'
import ThreadContent from '../ThreadContent'

interface Props extends UseModalProps {
  id: string
}

export default function ThreadModal({ id, ...modalProps }: Props) {
  const orgId = useOrgId()
  const windowSize = useWindowSize()

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
          h={`${windowSize.height * 0.9}px`}
          pt={2}
        />
      </ModalContent>
    </Modal>
  )
}
