/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { useCallback, useMemo, useState } from 'react'

export default function useModal(): [
  React.ReactNode | null,
  (title: string, showModal: (onClose: () => void) => React.ReactNode) => void
] {
  const [modalContent, setModalContent] = useState<null | {
    content: React.ReactNode
    title: string
  }>(null)

  const onClose = useCallback(() => {
    setModalContent(null)
  }, [])

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null
    }
    const { title, content } = modalContent
    return (
      <Modal isOpen onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          {content}
        </ModalContent>
      </Modal>
    )
  }, [modalContent, onClose])

  const showModal = useCallback(
    (
      title: string,
      // eslint-disable-next-line no-shadow
      getContent: (onClose: () => void) => React.ReactNode
    ) => {
      setModalContent({
        content: getContent(onClose),
        title,
      })
    },
    [onClose]
  )

  return [modal, showModal]
}
