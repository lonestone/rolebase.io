import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiMaximize2 } from 'react-icons/fi'
import { Link, LinkProps } from 'react-router-dom'
import IconTextButton from './IconTextButton'

export default function ModalMaximizeButton(props: LinkProps) {
  const { t } = useTranslation()

  return (
    <Link {...props} tabIndex={-1}>
      <IconTextButton
        aria-label={t('ModalMaximizeButton.label')}
        variant="ghost"
        size="sm"
        tooltipPlacement="bottom"
        icon={<FiMaximize2 />}
      />
    </Link>
  )
}
