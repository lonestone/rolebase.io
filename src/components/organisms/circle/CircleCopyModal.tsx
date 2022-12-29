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
import { cmdOrCtrlKey } from 'src/utils/env'

export default function CircleCopyModal(modalProps: UseModalProps) {
  const { t } = useTranslation()

  return (
    <Modal size="xl" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('CircleCopyModal.heading')}</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <UnorderedList>
            <ListItem>{t('CircleCopyModal.action1')}</ListItem>
            <ListItem>
              {t('CircleCopyModal.action2')} <Kbd>{cmdOrCtrlKey}</Kbd> +{' '}
              <Kbd size="xl">⇧</Kbd>
            </ListItem>
            <ListItem>{t('CircleCopyModal.action3')}</ListItem>
            <ListItem>{t('CircleCopyModal.action4')}</ListItem>
          </UnorderedList>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
