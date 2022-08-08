import { IconButton, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiMaximize2 } from 'react-icons/fi'
import { Link, LinkProps } from 'react-router-dom'

export default function ModalMaximizeButton(props: LinkProps) {
  const { t } = useTranslation()

  return (
    <Link {...props} tabIndex={-1}>
      <Tooltip hasArrow openDelay={400} label={t('ModalMaximizeButton.label')}>
        <IconButton
          aria-label={t('ModalMaximizeButton.label')}
          variant="ghost"
          size="sm"
          icon={<FiMaximize2 />}
        />
      </Tooltip>
    </Link>
  )
}
