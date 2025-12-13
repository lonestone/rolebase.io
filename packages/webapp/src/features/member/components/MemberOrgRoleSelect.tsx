import { useAuth } from '@/user/hooks/useAuth'
import {
  Button,
  ButtonProps,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Member_Role_Enum, type MemberFragment } from '@gql'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown, FiHelpCircle, FiX } from 'react-icons/fi'
import { trpc } from 'src/trpc'
import MemberInvitationModal from './MemberInvitationModal'
import MemberInviteModal from './MemberInviteModal'
import MemberRemoveAccessModal from './MemberRemoveAccessModal'
import useOrgAdmin from '../hooks/useOrgAdmin'

interface MemberOrgRoleSelectProps
  extends Omit<ButtonProps, 'onClick' | 'isLoading'> {
  member: MemberFragment
}

const ROLES: Member_Role_Enum[] = [
  Member_Role_Enum.Readonly,
  Member_Role_Enum.Member,
  Member_Role_Enum.Admin,
  Member_Role_Enum.Owner,
]

export default function MemberOrgRoleSelect({
  member,
  ...boxProps
}: MemberOrgRoleSelectProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const inviteModal = useDisclosure()
  const invitationModal = useDisclosure()
  const removeAccessModal = useDisclosure()
  const { user } = useAuth()
  const isAdmin = useOrgAdmin()

  const isCurrentMember = user?.id === member.userId
  const isDisabled = !isAdmin || isCurrentMember
  const currentRole = member.role || ''

  const handleRoleChange = useCallback(
    async (newRole: Member_Role_Enum | '') => {
      if (newRole === currentRole) return

      // Show confirmation modal when removing access
      if (!newRole) {
        removeAccessModal.onOpen()
        return
      }

      setLoading(true)
      try {
        if (member.userId) {
          // Update role for existing user
          await trpc.member.updateMemberRole.mutate({
            memberId: member.id,
            role: newRole,
          })
          toast({
            title: t('MemberOrgRoleSelect.saved'),
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }
      } catch (error: any) {
        toast({
          title: t('common.error'),
          description: error?.response?.data || error?.message || undefined,
          status: 'error',
        })
      }
      setLoading(false)
    },
    [member, currentRole, toast, t, removeAccessModal]
  )

  const hasPendingInvitation =
    currentRole && member.inviteDate && member.inviteEmail && !member.userId

  return (
    <>
      <VStack spacing={3} align="stretch">
        {!member.userId ? (
          hasPendingInvitation ? (
            <Button
              variant="outline"
              colorScheme="yellow"
              onClick={invitationModal.onOpen}
              {...boxProps}
            >
              {t('MemberOrgRoleSelect.viewPendingInvitation')}
            </Button>
          ) : (
            <Button
              variant="outline"
              colorScheme="green"
              onClick={inviteModal.onOpen}
              isLoading={loading}
              {...boxProps}
            >
              {t('MemberOrgRoleSelect.invite')}
            </Button>
          )
        ) : (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={isDisabled ? undefined : <FiChevronDown />}
              variant="link"
              isLoading={loading}
              isDisabled={isDisabled}
              {...boxProps}
            >
              {currentRole &&
                t(`MemberOrgRoleSelect.roles.${currentRole}.title`)}
            </MenuButton>
            <MenuList zIndex={10} shadow="lg">
              {ROLES.map((role) => (
                <MenuItem key={role} onClick={() => handleRoleChange(role)}>
                  <Text flex={1}>
                    {t(`MemberOrgRoleSelect.roles.${role}.title`)}
                  </Text>
                  <Tooltip
                    label={t(`MemberOrgRoleSelect.roles.${role}.description`)}
                    placement="left"
                  >
                    <span>
                      <Icon as={FiHelpCircle} ml={2} color="gray.500" />
                    </span>
                  </Tooltip>
                </MenuItem>
              ))}
              <MenuDivider />
              <MenuItem onClick={() => handleRoleChange('')}>
                <Icon as={FiX} mr={2} color="red.500" />
                <Text flex={1} color="red.500">
                  {t('MemberOrgRoleSelect.removeAccess')}
                </Text>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </VStack>

      {inviteModal.isOpen && (
        <MemberInviteModal
          member={member}
          isOpen
          onClose={inviteModal.onClose}
        />
      )}

      {invitationModal.isOpen && member.inviteEmail && member.inviteDate && (
        <MemberInvitationModal
          member={member}
          isOpen
          onClose={invitationModal.onClose}
        />
      )}

      {removeAccessModal.isOpen && (
        <MemberRemoveAccessModal
          member={member}
          isOpen
          onClose={removeAccessModal.onClose}
        />
      )}
    </>
  )
}
