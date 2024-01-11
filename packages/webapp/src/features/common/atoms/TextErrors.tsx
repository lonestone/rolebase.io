import { ApolloError } from '@apollo/client'
import { AuthErrorPayload } from '@nhost/hasura-auth-js'
import React from 'react'
import TextError from './TextError'

interface Props {
  errors: Array<Error | ApolloError | AuthErrorPayload | null | undefined>
}

export default function TextErrors({ errors }: Props) {
  return (
    <>
      {errors
        .filter(Boolean)
        .map((error, i) =>
          error ? <TextError key={i} error={error} /> : null
        )}
    </>
  )
}
