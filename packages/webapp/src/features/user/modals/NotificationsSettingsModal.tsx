import Switch from '@/common/atoms/Switch'
import RRuleEditor from '@/rrule/components/RRuleEditor'
import {
  Alert,
  Box,
  Button,
  Collapse,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
  useToast,
} from '@chakra-ui/react'
import { useUserData } from '@nhost/react'
import { getDefaultDigestRRule } from '@rolebase/shared/model/notifications'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useUserMetadata from '../hooks/useUserMetadata'

export default function NotificationsSettingsModal(modalProps: UseModalProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const userData = useUserData()
  const { metadata, setMetadata } = useUserMetadata()

  const [enabled, setEnabled] = useState(metadata?.digestRrule !== false)
  const [saving, setSaving] = useState(false)

  const [rrule, setRrule] = useState(
    () =>
      metadata?.digestRrule ||
      (userData ? getDefaultDigestRRule(userData.createdAt).toString() : '')
  )

  const handleSubmit = async () => {
    setSaving(true)
    await setMetadata('digestRrule', (enabled && rrule) || false)

    modalProps.onClose()
    toast({
      title: t('NotificationsSettingsModal.toastSuccess'),
      status: 'success',
    })
  }

  if (!userData) return null

  return (
    <Modal size="lg" {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('NotificationsSettingsModal.heading')}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Switch
            isChecked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          >
            {t('NotificationsSettingsModal.digest')}
          </Switch>

          <Collapse in={enabled}>
            <Box mt={7}>
              <RRuleEditor hideStartDate value={rrule} onChange={setRrule} />
            </Box>
          </Collapse>

          <Collapse in={!enabled}>
            <Alert status="info" mt={7}>
              {t('NotificationsSettingsModal.disabledInfo')}
            </Alert>
          </Collapse>

          <Box textAlign="right" mt={7} mb={2}>
            <Button
              colorScheme="blue"
              isLoading={saving}
              onClick={handleSubmit}
            >
              {t('common.save')}
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
