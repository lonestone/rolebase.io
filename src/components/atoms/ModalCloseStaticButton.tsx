import { IconButton, useModalContext } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CloseIcon from './CloseIcon'

export default function ModalCloseStaticButton() {
  const { t } = useTranslation()
  const { onClose } = useModalContext()

  return (
    <IconButton
      aria-label={t('ModalCloseStaticButton.label')}
      icon={<CloseIcon width="12px" height="12px" />}
      variant="ghost"
      size="sm"
      onClick={onClose}
    />
  )
}
