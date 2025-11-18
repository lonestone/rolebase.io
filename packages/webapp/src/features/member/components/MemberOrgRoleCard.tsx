import { Box, Text } from '@chakra-ui/react'
import { Member_Role_Enum } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface MemberOrgRoleCardProps {
  role: Member_Role_Enum | undefined
  isSelected: boolean
  onClick: () => void
}

const ROLE_NONE = 'None'

export default function MemberOrgRoleCard({
  role,
  isSelected,
  onClick,
}: MemberOrgRoleCardProps) {
  const { t } = useTranslation()

  return (
    <Box
      as="button"
      type="button"
      onClick={onClick}
      p={4}
      borderWidth="2px"
      borderColor={isSelected ? 'blue.500' : 'gray.200'}
      borderRadius="md"
      bg={isSelected ? 'blue.50' : 'white'}
      cursor="pointer"
      transition="all 0.2s"
      textAlign="left"
      w="100%"
      _hover={{
        borderColor: isSelected ? 'blue.600' : 'gray.300',
        bg: isSelected ? 'blue.100' : 'gray.50',
      }}
      _focus={{
        outline: 'none',
        boxShadow: 'outline',
      }}
      _dark={{
        borderColor: isSelected ? 'blue.400' : 'gray.600',
        bg: isSelected ? 'blue.900' : 'gray.800',
        _hover: {
          borderColor: isSelected ? 'blue.300' : 'gray.500',
          bg: isSelected ? 'blue.800' : 'gray.700',
        },
      }}
    >
      <Text
        fontWeight="bold"
        mb={2}
        color={isSelected ? 'blue.700' : 'gray.800'}
        _dark={{
          color: isSelected ? 'blue.200' : 'gray.100',
        }}
      >
        {t(`MemberEditModal.invitation.roles.${role ?? ROLE_NONE}.title`)}
      </Text>
      <Text
        fontSize="sm"
        color={isSelected ? 'blue.600' : 'gray.600'}
        _dark={{
          color: isSelected ? 'blue.300' : 'gray.400',
        }}
      >
        {t(`MemberEditModal.invitation.roles.${role ?? ROLE_NONE}.description`)}
      </Text>
    </Box>
  )
}
