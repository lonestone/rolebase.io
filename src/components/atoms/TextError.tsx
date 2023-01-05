import { Text } from '@chakra-ui/react'
import { ErrorPayload } from '@nhost/hasura-auth-js'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  error: Error | ErrorPayload
}

export default function TextError({ error }: Props) {
  const { t } = useTranslation()

  return (
    <Text color="red" fontWeight="bold">
      {t(`TextError.${(error as any).code}` as any, {
        defaultValue: error.message,
      })}
    </Text>
  )
}
