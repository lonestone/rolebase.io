import { Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
  error: Error
}

function getErrorMessage(error: Error) {
  const code: undefined | string = (error as any).code

  if (code === 'auth/invalid-email') {
    return 'Adresse email invalide.'
  }
  if (code === 'auth/user-disabled') {
    return 'Votre compte est désactivé.'
  }
  if (code === 'auth/user-not-found') {
    return 'Aucun compte ne correspond à cette adresse.'
  }
  if (code === 'auth/wrong-password') {
    return 'Mot de passe incorrect.'
  }
  if (code === 'auth/email-already-in-use') {
    return 'Cette adresse email est déjà utilisée.'
  }
  if (code === 'auth/weak-password') {
    return "Ce mot de passe est trop faible. Merci d'en choisir un plus long."
  }

  return error.message
}

export default function TextError({ error }: Props) {
  return (
    <Text color="red" fontWeight="bold">
      {getErrorMessage(error)}
    </Text>
  )
}
