import { emailSchema, nameSchema } from '@api/schemas'
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

interface Props {
  defaultEmail?: string
  loading?: boolean
  onSubmit(values: Values): void
}

interface Values {
  name: string
  email: string
  password: string
}

const schema = yup.object().shape({
  name: nameSchema,
  email: emailSchema,
  password: yup.string().required(),
})

export default function SignupForm({ defaultEmail, loading, onSubmit }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: { email: defaultEmail },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={5}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Nom</FormLabel>
          <Input
            {...register('name')}
            type="name"
            required
            placeholder="Votre nom..."
            autoFocus
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            {...register('email')}
            type="email"
            required
            placeholder="Votre adresse email..."
            autoFocus
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Mot de passe</FormLabel>
          <Input
            {...register('password')}
            type="password"
            required
            placeholder="Votre mot de passe..."
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Créer mon compte
          {loading && <Spinner ml={2} />}
        </Button>
      </VStack>
    </form>
  )
}
