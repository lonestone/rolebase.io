import { ArrowBackIcon } from '@chakra-ui/icons'
import { IconButton, useModalContext } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export default function ModalBackButton() {
  const { t } = useTranslation()
  const { onClose } = useModalContext()

  return (
    <IconButton
      aria-label={t('ModalBackButton.label')}
      icon={<ArrowBackIcon />}
      variant="ghost"
      position="absolute"
      top={2}
      left={2}
      onClick={onClose}
    />
  )
}
