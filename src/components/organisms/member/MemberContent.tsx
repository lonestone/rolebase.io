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
import MemberPictureEdit from '@components/molecules/MemberPictureEdit'
import MemberRoles from '@components/molecules/MemberRoles'
import useMember from '@hooks/useMember'
import useOrgAdmin from '@hooks/useOrgAdmin'
import { useUserId } from '@nhost/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import MemberEditModal from './MemberEditModal'

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
  const userId = useUserId()
  const member = useMember(id)
  const isAdmin = useOrgAdmin()
  const canEdit = isAdmin || (userId ? member?.userId === userId : false)

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
          <AlertTitle>{t('MemberContent.notFound')}</AlertTitle>
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
            {canEdit ? (
              <MemberPictureEdit
                id={id}
                name={member.name}
                src={member.picture || undefined}
                size="md"
              />
            ) : (
              <Avatar
                name={member.name}
                src={member.picture || undefined}
                size="md"
              />
            )}
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
            <Box mb={3}>
              <Markdown>{member.description}</Markdown>
            </Box>
          )}

          <FormControl>
            <FormLabel>{t('MemberContent.roles')}</FormLabel>
            <MemberRoles member={member} selectedCircleId={selectedCircleId} />
          </FormControl>
        </VStack>
      </ModalBody>

      {isEditOpen && <MemberEditModal id={id} isOpen onClose={onEditClose} />}
    </>
  )
}
