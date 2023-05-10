import { Tag, TagProps } from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { threadStatusColors } from 'src/theme'

interface Props extends TagProps {
  status: Thread_Status_Enum
}

export default function ThreadStatusText({ status, ...tagProps }: Props) {
  const { t } = useTranslation()
  return (
    <Tag colorScheme={threadStatusColors[status].tag} {...tagProps}>
      {t(`common.threadStatus.${status}`)}
    </Tag>
  )
}
