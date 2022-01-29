import { auth } from '@api/firebase'
import { emailSchema } from '@api/schemas'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import TextErrors from '@components/atoms/TextErrors'
import { Title } from '@components/atoms/Title'
import { yupResolver } from '@hookform/resolvers/yup'
import useCallbackState from '@hooks/useCallbackState'
import useQueryParams from '@hooks/useQueryParams'
import { sendPasswordResetEmail } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link as ReachLink } from 'react-router-dom'
import settings from 'src/settings'
import * as yup from 'yup'

type Params = {
  email: string
}

interface Values {
  email: string
}

const schema = yup.object().shape({
  email: emailSchema,
})

export default function ResetPasswordPage() {
  const queryParams = useQueryParams<Params>()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: { email: queryParams.email || '' },
  })

  const {
    call: onSubmit,
    loading,
    error,
    done,
  } = useCallbackState(({ email }: Values) =>
    sendPasswordResetEmail(auth, email, {
      url: `${settings.url}/login?email=${email}`,
    })
  )

  return (
    <Container maxW="sm" mt="60px">
      <Title>Mot de passe oublié</Title>

      <Heading size="md" mb={5}>
        Mot de passe oublié ?
      </Heading>

      {done ? (
        <Alert status="success">
          <AlertIcon />
          <AlertDescription>
            <p>
              Un email de réinitialisation de mot de passe vous a été envoyé !
            </p>
            <p>Vérifiez votre boîte email.</p>
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={5}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                {...register('email')}
                type="email"
                placeholder="Votre adresse email..."
                autoComplete="email"
                autoFocus
                required
              />
            </FormControl>

            <Button colorScheme="blue" type="submit" isDisabled={loading}>
              Réinitialiser mon mot de passe
              {loading && <Spinner ml={2} />}
            </Button>
          </VStack>

          <TextErrors errors={[error]} />

          <Center mt={4}>
            <Link to="/login" as={ReachLink} textDecoration="underline">
              Connexion
            </Link>
          </Center>
        </form>
      )}
    </Container>
  )
}
