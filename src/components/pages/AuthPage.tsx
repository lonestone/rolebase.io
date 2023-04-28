import BrandIcon from '@atoms/BrandIcon'
import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  useMediaQuery,
} from '@chakra-ui/react'
import useQueryParams from '@hooks/useQueryParams'
import LoginForm from '@organisms/user/LoginForm'
import SignupForm from '@organisms/user/SignupForm'
import React from 'react'
import settings from 'src/settings'

type Params = {
  email: string
}

export default function AuthPage() {
  const queryParams = useQueryParams<Params>()
  const [isSmallScreen] = useMediaQuery('(max-width: 900px)')

  const handleClose = () => {
    window.open(settings.websiteUrl, '_self')
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      size="4xl"
      isOpen
      closeOnEsc={false}
      onClose={handleClose}
    >
      <ModalOverlay bg="gray.100" _dark={{ bg: 'gray.800' }} />

      <ModalContent my="115px">
        <ModalCloseButton />

        <Center w="100%" textAlign="center" position="absolute" top="-70px">
          <BrandIcon size="md" />
        </Center>

        <ModalBody mx={10} my={7}>
          <SimpleGrid columns={isSmallScreen ? 1 : 2} spacing="150px">
            <LoginForm defaultEmail={queryParams.email || ''} />
            <SignupForm defaultEmail={queryParams.email} />
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
