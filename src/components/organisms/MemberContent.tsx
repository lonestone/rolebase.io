import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Spacer,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import Markdown from '@components/atoms/Markdown'
import ModalCloseStaticButton from '@components/atoms/ModalCloseStaticButton'
import { Title } from '@components/atoms/Title'
import ActionsMenu from '@components/molecules/ActionsMenu'
import MemberRoles from '@components/molecules/MemberRoles'
import useMember from '@hooks/useMember'
import { useOrgRole } from '@hooks/useOrgRole'
import { ClaimRole } from '@shared/model/userClaims'
import { useStoreState } from '@store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MemberEditModal from './modals/MemberEditModal'

interface Props {
  id: string
  selectedCircleId?: string
  changeTitle?: boolean
  headerIcons?: React.ReactNode
}

export default function MemberContent({
  id,
  changeTitle,
  selectedCircleId,
  headerIcons,
}: Props) {
  const { t } = useTranslation()
  const userId = useStoreState((state) => state.auth.user?.id)
  const member = useMember(id)
  const role = useOrgRole()
  const canEdit =
    role === ClaimRole.Admin || (userId ? member?.userId === userId : false)

  // Edit modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  if (!member) {
    return (
      <>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{t('organisms.MemberContent.notFound')}</AlertTitle>
        </Alert>
        <ModalCloseButton />
      </>
    )
  }

  return (
    <>
      {changeTitle && <Title>{member.name}</Title>}

      <ModalHeader pt={2} pr={3}>
        <Flex>
          <HStack mt={3} spacing={5}>
            <Avatar
              name={member.name}
              src={member.picture || undefined}
              size="md"
            />
            <Heading as="h2" size="md">
              {member.name}
            </Heading>
          </HStack>

          <Spacer />

          <Box>
            {canEdit && <ActionsMenu onEdit={onEditOpen} />}
            {headerIcons}
            <ModalCloseStaticButton />
          </Box>
        </Flex>
      </ModalHeader>

      <ModalBody pb={7}>
        <VStack spacing={5} align="stretch">
          {member.description && (
            <Markdown mb={3}>{member.description}</Markdown>
          )}

          <FormControl>
            <FormLabel>{t('organisms.MemberContent.roles')}</FormLabel>
            <MemberRoles member={member} selectedCircleId={selectedCircleId} />
          </FormControl>
        </VStack>
      </ModalBody>

      {isEditOpen && <MemberEditModal id={id} isOpen onClose={onEditClose} />}
    </>
  )
}
