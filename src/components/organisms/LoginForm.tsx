import { emailSchema } from '@api/schemas'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react'
import PasswordInput from '@components/atoms/PasswordInput'
import { Title } from '@components/atoms/Title'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link as ReachLink } from 'react-router-dom'
import * as yup from 'yup'

interface Props {
  defaultEmail?: string
  onSubmit(values: Values): void
}

interface Values {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: emailSchema,
  password: yup.string().required(),
})

export default function LoginForm({ defaultEmail, onSubmit }: Props) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: { email: defaultEmail || '' },
  })

  const email = watch('email')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title>Connexion</Title>

      <VStack spacing={5}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            {...register('email')}
            type="email"
            required
            placeholder="Votre adresse email..."
            autoComplete="email"
            autoFocus
          />
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Mot de passe</FormLabel>
          <PasswordInput
            {...register('password')}
            required
            placeholder="Votre mot de passe..."
            autoComplete="password"
          />
          <Link
            to={`/reset-password${email ? `?email=${email}` : ''}`}
            as={ReachLink}
            fontSize="sm"
            color="gray.500"
          >
            Mot de passe oublié ?
          </Link>
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Connexion
        </Button>
      </VStack>
    </form>
  )
}
