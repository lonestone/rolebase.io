import { ApolloError } from '@apollo/client'
import { Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  error: Error | ApolloError | undefined
}

export default function TextError({ error }: Props) {
  if (!error) return null
  const { t } = useTranslation()

  return (
    <Text color="red" fontWeight="bold">
      {t(`TextError.${(error as any).code}` as any, {
        defaultValue: error.message,
      })}
    </Text>
  )
}
