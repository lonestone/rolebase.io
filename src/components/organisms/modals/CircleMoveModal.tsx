import {
  Kbd,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  UseModalProps,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CircleMoveModal(modalProps: UseModalProps) {
  const { t } = useTranslation()

  return (
    <Modal size="xl" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {t('organisms.modals.CircleMoveModal.heading')}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <UnorderedList>
            <ListItem>{t('organisms.modals.CircleMoveModal.action1')}</ListItem>
            <ListItem>
              {t('organisms.modals.CircleMoveModal.action2')} <Kbd>⌘</Kbd>
            </ListItem>
            <ListItem>{t('organisms.modals.CircleMoveModal.action3')}</ListItem>
            <ListItem>{t('organisms.modals.CircleMoveModal.action4')}</ListItem>
          </UnorderedList>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
