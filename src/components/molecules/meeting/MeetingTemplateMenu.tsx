import { Button, Menu, MenuButton } from '@chakra-ui/react'
import { MeetingTemplateFragment, useMeetingTemplatesSubscription } from '@gql'
import { useOrgId } from '@hooks/useOrgId'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'
import MeetingTemplateMenuList from './MeetingTemplateMenuList'

interface Props {
  onSelect: (template: MeetingTemplateFragment) => void
}

export default function MeetingTemplateMenu({ onSelect }: Props) {
  const { t } = useTranslation()
  const orgId = useOrgId()

  // Subscribe to templates
  const { data } = useMeetingTemplatesSubscription({
    skip: !orgId,
    variables: { orgId: orgId! },
  })
  const meetingTemplates = data?.meeting_template

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        size="sm"
        variant="link"
        rightIcon={<FiChevronDown />}
      >
        {t('MeetingTemplateMenu.menu')}
      </MenuButton>
      <MeetingTemplateMenuList
        meetingTemplates={meetingTemplates}
        onSelect={onSelect}
      />
    </Menu>
  )
}
