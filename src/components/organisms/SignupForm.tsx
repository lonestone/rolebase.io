import { emailSchema, nameSchema } from '@api/schemas'
import {
  Box,
  Button,
  FormControl,
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
          <FormLabel>Nom</FormLabel>
          <Input
            {...register('name')}
            type="name"
            required
            placeholder="Votre nom..."
            autoComplete="name"
            autoFocus
          />
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            {...register('email')}
            type="email"
            required
            placeholder="Votre adresse email..."
            autoComplete="email"
          />
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            {...register('password')}
            type="password"
            required
            placeholder="Votre mot de passe..."
            autoComplete="new-password"
          />
        </FormControl>

        {/*
          Second hidden password field to make password generation
          works with password managers
        */}
        <Box position="absolute" zIndex={-1} opacity="0">
          <Input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            tabIndex={-1}
          />
        </Box>

        <Button colorScheme="blue" type="submit" isDisabled={loading}>
          Créer mon compte
          {loading && <Spinner ml={2} />}
        </Button>
      </VStack>
    </form>
  )
}
