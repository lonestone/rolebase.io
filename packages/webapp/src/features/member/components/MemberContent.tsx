import {
  AVATAR_HEADING_WIDTH,
  getResizedImageUrl,
} from '@/common/api/storage_images'
import ModalCloseStaticButton from '@/common/atoms/ModalCloseStaticButton'
import { Title } from '@/common/atoms/Title'
import { useAuth } from '@/user/hooks/useAuth'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Flex,
  Heading,
  ModalCloseButton,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useMember from '../hooks/useMember'
import useOrgAdmin from '../hooks/useOrgAdmin'
import { MemberEditableField } from './MemberEditableField'
import MemberNameEditable from './MemberNameEditable'
import MemberOrgRoleSelect from './MemberOrgRoleSelect'
import MemberPictureEdit from './MemberPictureEdit'
import MemberRoles from './MemberRoles'

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
  const { user } = useAuth()
  const member = useMember(id)
  const isAdmin = useOrgAdmin()
  const canEdit = isAdmin || (user ? member?.userId === user.id : false)

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
          {headerIcons}
          <ModalCloseStaticButton />
        </Box>

        <Flex flexDirection="column" alignItems="center">
          {canEdit ? (
            <MemberPictureEdit
              id={id}
              name={member.name}
              src={
                getResizedImageUrl(member.picture, AVATAR_HEADING_WIDTH) ||
                undefined
              }
              size="2xl"
            />
          ) : (
            <Avatar
              name={member.name}
              src={
                getResizedImageUrl(member.picture, AVATAR_HEADING_WIDTH) ||
                undefined
              }
              size="2xl"
            />
          )}

          <MemberNameEditable member={member} isDisabled={!canEdit} mt={2} />

          {canEdit && <MemberOrgRoleSelect member={member} size="sm" mt={2} />}
        </Flex>
      </Box>

      <Box px={6}>
        <VStack spacing={5} align="stretch">
          <MemberEditableField
            label={t('MemberContent.description')}
            placeholder={t('MemberContent.descriptionPlaceholder', {
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
          </Box>
        </VStack>
      </Box>
    </>
  )
}
