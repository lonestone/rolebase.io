import { TextProps, Text } from '@chakra-ui/react'
import { Thread_Status_Enum } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props extends TextProps {
  status: Thread_Status_Enum
}

export default function ThreadStatusText({ status }: Props) {
  const { t } = useTranslation()
  return <Text as="b">{t(`common.threadStatus.${status}`)}</Text>
}
