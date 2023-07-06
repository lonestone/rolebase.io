import { Box, Flex, Heading } from '@chakra-ui/react'
import {
  MemberFragment,
  useMemberSkillLevelsSubscription,
  useSkillCategoriesSubscription,
} from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import useOrgMember from '@hooks/useOrgMember'
import MemberSkillsTable from '@molecules/member/MemberSkillsTable'
import SkillsSearchButton from '@molecules/search/entities/skills/SkillsSearchButton'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'

interface Props {
  member: MemberFragment
}

export default function MemberSkills({ member }: Props) {
  const { t } = useTranslation()

  const isMember = useOrgMember()
  const orgId = useOrgId()

  // Subscribe to skills of org
  const { data } = useSkillCategoriesSubscription({
    skip: !orgId,
    variables: {
      orgId: orgId!,
    },
  })
  const skillByCategories = data?.skill_category || []

  const { data: memberSkills } = useMemberSkillLevelsSubscription({
    skip: !member.id,
    variables: {
      memberId: member.id,
    },
  })

  console.log(memberSkills)

  //   const addCircleMember = useAddCircleMember()

  const handleAddMemberSkills = useCallback(async (id: string) => {
    // TODO: Create member skill of existing skill
    console.log(id)
  }, [])

  const handleCreateMemberSkills = useCallback(async (name: string) => {
    // TODO: Create skill then skills
    // open modal with name + add categ + level + descriptions ?
    console.log(name)
  }, [])

  return (
    <Box>
      <Flex mb={2} alignItems="center" justifyContent="space-between">
        <Heading as="h3" size="sm">
          {t('MemberSkills.heading')}
        </Heading>
        {isMember && (
          <SkillsSearchButton
            size="sm"
            skillByCategories={skillByCategories}
            variant="outline"
            borderRadius="full"
            leftIcon={<FiPlus />}
            onSelect={handleAddMemberSkills}
            onCreate={handleCreateMemberSkills}
          >
            {t('MemberSkills.addSkill')}
          </SkillsSearchButton>
        )}
      </Flex>

      <Box>
        <MemberSkillsTable />
      </Box>

      {/* <Accordion
        index={selectedCircleIndex}
        allowToggle
        mx={-4}
        mb={5}
        onChange={handleAccordionChange}
      >
        {memberCircles.map((circle) => (
          <MemberRoleItem
            key={circle.id}
            memberId={member.id}
            circle={circle}
          />
        ))}
      </Accordion> */}
    </Box>
  )
}
