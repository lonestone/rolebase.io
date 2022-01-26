import { emailSchema } from '@api/schemas'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { Title } from '@components/atoms/Title'
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
  email: string
  password: string
}

const schema = yup.object().shape({
  email: emailSchema,
  password: yup.string().required(),
})

export default function LoginForm({ defaultEmail, loading, onSubmit }: Props) {
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
      <Title>Connexion</Title>

      <VStack spacing={5}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            {...register('email')}
            type="email"
            required
            placeholder="Votre adresse email..."
            autoFocus
          />
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            {...register('password')}
            type="password"
            required
            placeholder="Votre mot de passe..."
          />
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Connexion
          {loading && <Spinner ml={2} />}
        </Button>
      </VStack>
    </form>
  )
}
