import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, LinkProps } from 'react-router-dom'
import { MaximizeIcon } from 'src/icons'
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
        icon={<MaximizeIcon size={20} />}
      />
    </Link>
  )
}
