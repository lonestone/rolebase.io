import MemberRoles from '@/member/components/MemberRoles'
import useMember from '@/member/hooks/useMember'
import { Avatar, Flex, Heading, ModalCloseButton } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  id: string
  selectedCircleId?: string
}

export default function MemberCard({ id, selectedCircleId }: Props) {
  const { t } = useTranslation()
  const member = useMember(id)

  if (!member) return null

  return (
    <>
      <ModalCloseButton />

      <Flex flexDirection="column" alignItems="center" mt={5} mb={8}>
        <Avatar
          name={member.name}
          src={member.picture || undefined}
          size="2xl"
        />

        <Heading as="h2" size="md" textAlign="center" mt={2}>
          {member.name}
        </Heading>
      </Flex>

      <Flex ml={5} mb={2} alignItems="center" justifyContent="space-between">
        <Heading as="h3" size="sm">
          {t('MemberContent.memberRolesHeading')}
        </Heading>
      </Flex>

      <MemberRoles member={member} selectedCircleId={selectedCircleId} />
    </>
  )
}
