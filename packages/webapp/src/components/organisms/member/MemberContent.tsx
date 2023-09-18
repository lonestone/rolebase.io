import ModalCloseStaticButton from '@atoms/ModalCloseStaticButton'
import { Title } from '@atoms/Title'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Flex,
  Heading,
  ModalCloseButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import useMember from '@hooks/useMember'
import useOrgAdmin from '@hooks/useOrgAdmin'
import ActionsMenu from '@molecules/ActionsMenu'
import { MemberEditableField } from '@molecules/member/MemberEditableField'
import MemberPictureEdit from '@molecules/member/MemberPictureEdit'
import MemberRoles from '@molecules/member/MemberRoles'
import MemberWorkingTime from '@molecules/member/MemberWorkingTime'
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

      <Box pt={3} pb={10} position="relative">
        <Box position="absolute" top={2} right={2}>
          {canEdit && <ActionsMenu onEdit={onEditOpen} />}
          {headerIcons}
          <ModalCloseStaticButton />
        </Box>

        <Flex flexDirection="column" alignItems="center">
          {canEdit ? (
            <MemberPictureEdit
              id={id}
              name={member.name}
              src={member.picture || undefined}
              size="2xl"
            />
          ) : (
            <Avatar
              name={member.name}
              src={member.picture || undefined}
              size="2xl"
            />
          )}

          <Heading as="h2" size="md" textAlign="center" mt={2}>
            {member.name}
          </Heading>
        </Flex>
      </Box>

      <Box px={6} pb={7}>
        <VStack spacing={5} align="stretch">
          <MemberEditableField
            label={t('MemberEditModal.description')}
            placeholder={t('MemberEditModal.descriptionPlaceholder', {
              name: member.name,
            })}
            member={member}
            field="description"
            editable={canEdit}
            hideTitle
            mt={0}
            mb={10}
          />

          <Box>
            <Flex mb={2} alignItems="center" justifyContent="space-between">
              <Heading as="h3" size="sm">
                {t('MemberContent.memberRolesHeading')}
              </Heading>
            </Flex>

            <MemberRoles
              member={member}
              selectedCircleId={selectedCircleId}
              mx={-4}
              mb={10}
            />
            <MemberWorkingTime member={member} />
          </Box>
        </VStack>
      </Box>

      {isEditOpen && <MemberEditModal id={id} isOpen onClose={onEditClose} />}
    </>
  )
}
