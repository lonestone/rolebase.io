import IconTextButton from '@/common/atoms/IconTextButton'
import { ButtonProps, forwardRef } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactionIcon } from 'src/icons'

export default forwardRef(function ReactionMenuButton(props: ButtonProps, ref) {
  const { t } = useTranslation()

  return (
    <IconTextButton
      ref={ref}
      size="sm"
      icon={<ReactionIcon size="18" />}
      aria-label={t('ReactionAddButton.tooltip')}
      variant="ghost"
      {...props}
    />
  )
})
