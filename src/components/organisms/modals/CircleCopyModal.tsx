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

export default function CircleCopyModal(modalProps: UseModalProps) {
  const { t } = useTranslation()

  return (
    <Modal size="xl" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {t('organisms.modals.CircleCopyModal.heading')}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <UnorderedList>
            <ListItem>{t('organisms.modals.CircleCopyModal.action1')}</ListItem>
            <ListItem>
              {t('organisms.modals.CircleCopyModal.action2')} <Kbd>⌘</Kbd> +{' '}
              <Kbd size="xl">⇧</Kbd>
            </ListItem>
            <ListItem>{t('organisms.modals.CircleCopyModal.action3')}</ListItem>
            <ListItem>{t('organisms.modals.CircleCopyModal.action4')}</ListItem>
          </UnorderedList>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
