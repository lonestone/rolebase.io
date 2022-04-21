import { auth } from '@api/firebase'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Spinner,
  useToast,
  VStack,
} from '@chakra-ui/react'
import PasswordInput from '@components/atoms/PasswordInput'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import { yupResolver } from '@hookform/resolvers/yup'
import useCallbackState from '@hooks/useCallbackState'
import useQueryParams from '@hooks/useQueryParams'
import { confirmPasswordReset } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import PasswordConfirmInputDummy from './PasswordConfirmInputDummy'
import PasswordEmailInputDummy from './PasswordEmailInputDummy'

type Params = {
  oobCode: string
  continueUrl: string
}

interface Values {
  password: string
}

const schema = yup.object().shape({
  password: yup.string().min(6),
})

export default function ConfirmResetPasswordPage() {
  const { oobCode, continueUrl } = useQueryParams<Params>()
  const toast = useToast()
  const history = useHistory()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
  })

  const {
    call: onSubmit,
    loading,
    error,
    done,
  } = useCallbackState(async ({ password }: Values) => {
    if (!oobCode || !continueUrl) return

    // Confirm password change
    await confirmPasswordReset(auth, oobCode, password)

    // Redirect to continueUrl
    history.push(continueUrl.replace(/^.*:\/\/[^/]+/, ''))

    // Show toast
    toast({
      title: 'Mot de passe changé',
      description: 'Votre mot de passe a été changé avec succès.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  })

  return (
    <Container maxW="sm" mt="60px">
      <Title>Réinitialiser mon mot de passe</Title>

      <Heading size="md" mb={5}>
        Réinitialiser mon mot de passe
      </Heading>

      {done ? (
        <Alert status="success">
          <AlertIcon />
          <AlertDescription>
            <p>Email de réinitialisation de mot de passe envoyé !</p>
            <p>Vérifiez votre boîte email.</p>
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={5}>
            <PasswordEmailInputDummy />

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <PasswordInput
                {...register('password')}
                required
                placeholder="Mot de passe..."
                autoComplete="new-password"
              />
            </FormControl>

            <PasswordConfirmInputDummy />

            <Button colorScheme="blue" type="submit" isDisabled={loading}>
              Enregistrer
              {loading && <Spinner ml={2} />}
            </Button>
          </VStack>
        </form>
      )}

      <TextErrors errors={[error]} />
    </Container>
  )
}
