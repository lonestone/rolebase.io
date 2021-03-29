import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { emailSchema } from '../../api/schemas'

interface Props {
  defaultEmail?: string
  loading?: boolean
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

export default function LoginForm({ defaultEmail, loading, onSubmit }: Props) {
  const { handleSubmit, errors, register } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: { email: defaultEmail },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={5}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="Votre adresse email..."
            ref={register}
            autoFocus
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Mot de passe</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Votre mot de passe..."
            ref={register}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Connexion
          {loading && <Spinner ml={2} />}
        </Button>
      </VStack>
    </form>
  )
}
