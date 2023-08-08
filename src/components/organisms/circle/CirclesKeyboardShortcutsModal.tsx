import {
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Tr,
  useMediaQuery,
  UseModalProps,
} from '@chakra-ui/react'
import useOrgMember from '@hooks/useOrgMember'
import { cmdOrCtrlKey } from '@utils/env'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CirclesKeyboardShortcutsModal(
  modalProps: UseModalProps
) {
  const { t } = useTranslation()
  const [isSmallScreen] = useMediaQuery('(max-width: 600px)')
  const isMember = useOrgMember()

  if (isSmallScreen || !isMember) {
    return null
  }

  return (
    <Modal size="2xl" autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('CirclesKeyboardShortcutsModal.heading')}</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Table>
            <Tbody>
              <Tr>
                <Td>
                  <Kbd>{cmdOrCtrlKey}</Kbd> + <Kbd>Click</Kbd>
                </Td>
                <Td>{t('CirclesKeyboardShortcutsModal.CmdClick')}</Td>
              </Tr>
              <Tr>
                <Td whiteSpace="nowrap">
                  <Kbd>{cmdOrCtrlKey}</Kbd> + <Kbd size="xl">⇧</Kbd> +{' '}
                  <Kbd>Click</Kbd>
                </Td>
                <Td>{t('CirclesKeyboardShortcutsModal.CmdShiftClick')}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
