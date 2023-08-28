import { IconButton, useModalContext } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BackIcon } from 'src/icons'

export default function ModalBackButton() {
  const { t } = useTranslation()
  const { onClose } = useModalContext()

  return (
    <IconButton
      aria-label={t('ModalBackButton.label')}
      icon={<BackIcon />}
      variant="ghost"
      position="absolute"
      top={2}
      left={2}
      onClick={onClose}
    />
  )
}
